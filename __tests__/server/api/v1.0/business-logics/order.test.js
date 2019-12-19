import {
  order,
  orderStatus,
  orderTransaction,
  product,
  user,
} from '/api/v1.0/business-logics';
import * as domains from '/api/v1.0/domains';

jest.mock('/utils/json', () => ({
  transformSequelizeModel: jest.fn((model) => model),
}));

jest.mock('/models', () => ({
  sequelize: {
    transaction: jest.fn(() => ({
      commit: jest.fn(() => true),
      rollback: jest.fn(() => false),
    })),
  },
}));

describe('create', () => {
  it('should create order successfully', async () => {
    const productId = 1;
    const lineUserId = 'weqwe2e113e1e1sad';
    const displayName = 'foo';

    const mockStatusResult = { status: '0' };
    orderStatus.findByStatus = jest.fn(() => Promise.resolve(mockStatusResult));

    const mockUserResult = [{ id: 0 }];
    user.create = jest.fn(() => Promise.resolve(mockUserResult));

    const mockProductResult = { id: 0 };
    product.findById = jest.fn(() => Promise.resolve(mockProductResult));

    const mockOrderResult = { id: 0, userId: mockUserResult.id, status: mockStatusResult.status };
    domains.order.create = jest.fn(() => Promise.resolve(mockOrderResult));

    orderTransaction.create = jest.fn(() => Promise.resolve());

    const result = await order.create({ productId, lineUserId, displayName });
    expect(result).toMatchObject(mockOrderResult);

  });

});

describe('updateStatus', () => {
  it('should update successful', async () => {
    const orderId = 1;
    const status = 'served';

    const mockOrderModel = { id: 1, status: 2 };
    domains.order.updateStatus = jest.fn(() => Promise.resolve(mockOrderModel));

    const result = await order.updateStatus({ orderId, status });
    expect(result).toMatchObject(mockOrderModel);

  });
});
