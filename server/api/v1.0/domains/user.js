import models from '/models';

const create = async ({
  lineUserId,
  displayName,
  role,
  transaction,
}) => await models.users.create({
  lineUserId,
  displayName,
  role,
}, { transaction });

const findByUserId = async ({
  lineUserId,
}) => await models.users.findOne({
  where: {
    lineUserId,
  },
});

export default {
  create,
  findByUserId,
};
