import models from '/models';

const create = async ({
  name,
  imageId,
  priceId,
  status,
  transaction,
}) => await models.products.create({
  name,
  imageId,
  priceId,
  status,
}, { transaction });

const findByName = async ({
  productName,
}) => await models.products.findOne({
  where: {
    name: productName,
  },
});

const findById = async ({
  productId,
}) => await models.products.findByPk(productId);

const update = async ({
  id,
  status,
}) => await models.products.update({ status }, {
  where: {
    id,
  }, returning: true,
});

export default {
  create,
  findByName,
  findById,
  update,
};
