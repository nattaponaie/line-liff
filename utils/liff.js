import { message } from 'antd';

import {
  LIFF_ID, SERVER_ENDPOINT_HOST,
} from '/web-config';

export const initializeLiff = async ({
  liff,
}) => await liff.init({ liffId: LIFF_ID });

export const getProfile = async ({ liff }) => {
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: SERVER_ENDPOINT_HOST });
    await initializeLiff({ liff });
  }
  return await liff.getProfile();
};

export const sendMessage = ({
  liff,
  msg,
}) => {
  if (!liff.isInClient()) {
    message.success(msg);
  } else {
    message.success(msg);
    liff.sendMessages([{
        'type': 'text',
        'text': msg,
    }]);
  }
};
