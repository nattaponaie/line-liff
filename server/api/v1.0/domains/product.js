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

const findAll = async () => await models.products.findAll({
  include: [
    {
      model: models.images,
    },
  ],
});

export default {
  create,
  findByName,
  findById,
  update,
  findAll,
};
