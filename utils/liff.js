import { LIFF_ID } from '/web-config';

export const initializeLiff = async ({
  liff,
}) => {
  liff.init({
    liffId: LIFF_ID,
  }).then((response) => {
    console.log('response', response);

  }).catch((error) => {
    console.log('initializeLiff Error', error);
    Promise.reject(error);
  });
};

export const getProfile = async ({ liff }) => await liff.getProfile();
