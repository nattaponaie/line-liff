import models from '/models';

const create = async ({
  lineUserId,
  displayName,
  role,
}) => await models.users.create({
  lineUserId,
  displayName,
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
