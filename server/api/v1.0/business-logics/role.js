import { lowerCase } from 'lodash';

import { role } from '/api/v1.0/domains';
import { InvalidError } from '/utils/error';

export const ROLE_TYPE = ['user', 'admin'];
const ERRORS_ROLE_NOT_FOUND = 'Role does not exist';

const transformRoleName = (roleName) => {
  const roleId = ROLE_TYPE.indexOf(lowerCase(roleName));
  if (roleId === -1) {
    throw new InvalidError(ERRORS_ROLE_NOT_FOUND);
  }
  return roleId;
};

const findByRole = async ({
  roleName,
}) => {
  const roleId = transformRoleName(roleName);
  return await role.findByRole({ roleId });
};

export default {
  findByRole,
};
