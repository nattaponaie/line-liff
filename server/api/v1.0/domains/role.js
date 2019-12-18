import models from '/models';

const findByRole = async ({
  roleId,
}) => await models.roles.findOne({
  where: {
    role: roleId,
  },
});

export default {
  findByRole,
};
