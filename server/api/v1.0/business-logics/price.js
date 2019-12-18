import { price } from '/api/v1.0/domains';

const create = async ({
  priceValue,
  transaction,
}) => await price.create({ priceValue, transaction });

export default {
  create,
};
