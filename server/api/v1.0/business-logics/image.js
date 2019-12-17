import { image } from '/api/v1.0/domains';

const create = async ({
  productImage,
  transaction,
}) => await image.create({ productImage, transaction });

export default {
  create,
};
