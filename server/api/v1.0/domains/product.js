import models from '/models';

const findAll = async () => models.products.findAll();

export default {
  findAll,
};
