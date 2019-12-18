import models from '/models';

const create = async ({
  firstName,
  lastName,
  role,
}) => await models.users.create({
  firstName,
  lastName,
  role,
});

const findByUserId = async ({
  userId,
}) => await models.users.findOne({
  where: {
    id: userId,
  },
});

export default {
  create,
  findByUserId,
};
