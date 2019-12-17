import models from '/models';

const create = async ({
  priceValue,
  transaction,
}) => await models.prices.create({
  price: priceValue,
}, { transaction });

export default {
  create,
};
