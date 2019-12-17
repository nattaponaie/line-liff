import { get } from 'lodash';
import Sequelize from 'sequelize';

import {
  image, price,
} from '/api/v1.0/business-logics';
import { product } from '/api/v1.0/domains';
import models from '/models';
import { base64Encode } from '/utils/image';
import { transformSequelizeModel } from '/utils/json';

const create = async ({
  productName,
  productImage,
  priceValue,
}) => {
  const transaction = await models.sequelize.transaction({
    autocommit: false,
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    deferrable: Sequelize.Deferrable.SET_IMMEDIATE,
  });

  try {
    const priceResult = transformSequelizeModel(await price.create({ priceValue, transaction }));
    const priceId = get(priceResult, 'id');

    const imageEncoded = base64Encode(productImage);

    const imageResult = transformSequelizeModel(await image.create({ productImage: imageEncoded, transaction }));
    const imageId = get(imageResult, 'id');


    const productResult = await product.create({ name: productName, imageId, priceId, transaction });

    transaction.commit();
    return productResult;
  } catch (err) {
    transaction.rollback();
    throw err;
  }
};

export default {
  create,
};
