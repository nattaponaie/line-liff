import { appendResponseMessage } from '/utils/use-response-message';

describe('useResponseMessage', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('appendResponseMessage()', () => {
    describe('when the function is called with non-exist responseMessage', () => {
      it('should call setResponseMessages with new message', () => {
        const appendResponseMessageFirstProps = {
          setResponseMessages: jest.fn(),
        };
        const appendResponseMessageSecondProps = {
          msg: 'error',
        };

        appendResponseMessage(appendResponseMessageFirstProps)(appendResponseMessageSecondProps);

        expect(appendResponseMessageFirstProps.setResponseMessages).toBeCalled();
      });
    });

    describe('when the function is called with existing responseMessage', () => {
      it('should call setResponseMessages with combination of old message and new message', () => {

        const appendResponseMessageFirstProps = {
          errorMessage: 'any error',
          setResponseMessages: jest.fn(),
        };
        const appendResponseMessageSecondProps = {
          msg: 'error',
        };

        appendResponseMessage(appendResponseMessageFirstProps)(appendResponseMessageSecondProps);

        expect(appendResponseMessageFirstProps.setResponseMessages).toBeCalled();
      });
    });
  });
});
