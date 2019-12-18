import { role } from '/api/v1.0/business-logics';
import { user } from '/api/v1.0/domains';
import { transformSequelizeModel } from '/utils/json';

const ERROR_CANNOT_FOUND_USER = {
  model: 'user',
  message: 'User id does not exist',
};

const create = async ({
  lineUserId,
  displayName,
  roleName,
  transaction,
}) => {
  const roleResult = transformSequelizeModel(await role.findByRole({ roleName: roleName || 'user' }));
  return await user.create({ lineUserId, displayName, role: roleResult.role, transaction });
};

const findByUserId = async ({
  lineUserId,
}) => await user.findByUserId({ lineUserId });

export default {
  create,
  findByUserId,
  ERROR_CANNOT_FOUND_USER,
};
