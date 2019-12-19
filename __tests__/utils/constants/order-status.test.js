import { transformStatusName } from '/utils/constants/order-status';

describe('transformStatusName', () => {
  it('should return correct status name', async () => {
    const status = 'new';
    const mockResult = 0;
    const result = transformStatusName(status);
    expect(result).toEqual(mockResult);

  });

  it('should return -1 when status name does not exist', async () => {
    const status = 'buying';
    const result = transformStatusName(status);
    expect(result).toEqual(-1);

  });
});
