import { get } from 'lodash';

import { getRequest } from '/utils/httpHelper';

const getAllProduct = async ({
  appendErrorMessage,
}) => {
  try {
    return await getRequest({
      path: 'products',
    });
  } catch (err) {
    appendErrorMessage({ msg: `There is an error during get products ${err}` });
  }
};

export {
  getAllProduct,
};
