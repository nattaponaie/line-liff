import models from '/models';

const create = async ({
  lineUserId,
  displayName,
  role,
  transaction,
}) => await models.users.findOrCreate({
  where: {
    lineUserId,
  },
  defaults: {
    lineUserId,
    displayName,
    role,
  },
  transaction,
});

const findByLineUserId = async ({
  lineUserId,
}) => await models.users.findOne({
  where: {
    lineUserId,
  },
});

export default {
  create,
  findByLineUserId,
};
