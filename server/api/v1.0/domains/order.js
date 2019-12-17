import models from '/models';

const create = async ({
  status,
  userId,
}) => await models.orders.create({
  status,
  userId,
});

export default {
  create,
};
