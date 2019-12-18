import models from '/models';

const create = async ({
  productImage,
  transaction,
}) => await models.images.create({
  data: productImage,
}, { transaction });

export default {
  create,
};
