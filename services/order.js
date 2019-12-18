import { postRequest } from '/utils/httpHelper';

const postOrder = async ({
  productId,
}) => {
  try {
    return await postRequest({
      path: 'orders',
      attributes: { productId, userId: 1 },
    });
  } catch (err) {
    throw err;
  }
};

export {
  postOrder,
};
