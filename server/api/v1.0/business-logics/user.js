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

const findByLineUserId = async ({
  lineUserId,
}) => await user.findByLineUserId({ lineUserId });

export default {
  create,
  findByLineUserId,
  ERROR_CANNOT_FOUND_USER,
};
