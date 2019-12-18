import {
  patchRequest, postRequest,
} from '/utils/httpHelper';

const postOrder = async ({
  productId,
  lineUserId,
  displayName,
}) => {
  try {
    return await postRequest({
      path: 'orders',
      attributes: { productId, lineUserId, displayName },
    });
  } catch (err) {
    throw err;
  }
};

const updateOrderStatus = async ({
  orderId,
  status,
}) => {
  try {
    return await patchRequest({
      path: `orders/${orderId}/status`,
      attributes: { status },
    });
  } catch (err) {
    throw err;
  }
};

export {
  postOrder,
  updateOrderStatus,
};
