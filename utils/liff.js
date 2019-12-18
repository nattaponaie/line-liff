import {
  LIFF_ID, SERVER_ENDPOINT_HOST,
} from '/web-config';

export const initializeLiff = ({
  liff,
}) => liff.init({ liffId: LIFF_ID });

export const getProfile = async ({ liff }) => {
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: SERVER_ENDPOINT_HOST });
    initializeLiff({ liff });
  }
  await liff.getProfile();
};
