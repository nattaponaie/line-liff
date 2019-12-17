import { role } from '/api/v1.0/business-logics';
import { user } from '/api/v1.0/domains';
import { transformSequelizeModel } from '/utils/json';

const ERROR_CANNOT_FOUND_USER = {
  model: 'user',
  message: 'User id does not exist',
};

const create = async ({
  firstName,
  lastName,
  roleName,
}) => {
  const roleResult = transformSequelizeModel(await role.findByRole({ roleName }));
  return await user.create({ firstName, lastName, role: roleResult.role });
};

const findByUserId = async ({
  userId,
}) => await user.findByUserId({ userId });

export default {
  create,
  findByUserId,
  ERROR_CANNOT_FOUND_USER,
};
