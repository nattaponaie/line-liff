import models from '/models';

const create = async ({
  name,
  imageId,
  priceId,
  transaction,
}) => await models.products.create({
  name,
  imageId,
  priceId,
}, { transaction });

export default {
  create,
};
