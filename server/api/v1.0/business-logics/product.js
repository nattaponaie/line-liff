import {
 get, isEmpty,
} from 'lodash';
import Sequelize from 'sequelize';

import {
  image, price,
  productStatus,
} from '/api/v1.0/business-logics';
import { product } from '/api/v1.0/domains';
import models from '/models';
import { NotFoundError } from '/utils/error';
import { base64Encode } from '/utils/image';
import { transformSequelizeModel } from '/utils/json';

const ERROR_CANNOT_FOUND_PRODUCT_NAME = {
  model: 'product',
  message: 'Product name does not exist',
};

const ERROR_CANNOT_FOUND_PRODUCT_ID = {
  model: 'product',
  message: 'Product id does not exist',
};

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

    const productStatusResult = transformSequelizeModel(await productStatus.findByStatus({ statusName: 'actived' }));
    const statusId = get(productStatusResult, 'status');

    const productResult = await product.create({ name: productName, imageId, priceId, transaction, status: statusId });

    transaction.commit();
    return productResult;
  } catch (err) {
    transaction.rollback();
    throw err;
  }
};

const findByName = async ({
  productName,
}) => await product.findByName({ productName });

const findById = async ({
  productId,
}) => await product.findById({ productId });

const update = async ({
  statusName,
  productId,
}) => {
  const productStatusResult = transformSequelizeModel(await productStatus.findByStatus({ statusName }));
  const statusId = get(productStatusResult, 'status');

  const productResult = await product.update({ status: statusId, id: productId });
  return productResult;
};

const findAll = async () => transformSequelizeModel(await product.findAll());

export default {
  create,
  findByName,
  ERROR_CANNOT_FOUND_PRODUCT_NAME,
  ERROR_CANNOT_FOUND_PRODUCT_ID,
  findById,
  update,
  findAll,
};
