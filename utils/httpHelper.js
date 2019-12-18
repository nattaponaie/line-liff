import axios from 'axios';
import { get } from 'lodash';

import {
  API_PREFIX,
  AXIOS_TIMEOUT,
} from '/web-config';

const instance = axios.create({
  baseURL: API_PREFIX,
  timeout: AXIOS_TIMEOUT,
});

const createFullUrl = ({
  version = 'v1.0',
  path,
}) => {
  let url = version;
  url += path && `/${path}`;
  return url;
};

const getRequest = async ({
  version,
  path,
}) => new Promise(async (resolve, reject) => {
  const url = createFullUrl({ version, path });
  instance.get(url)
    .then(response => resolve(get(response, ['data', 'attributes'])))
    .catch(error => reject(error));
});

const postRequest = async ({
  version,
  path,
  attributes,
}) => new Promise(async (resolve, reject) => {
  const url = createFullUrl({ version, path });
  const body = {
    ...attributes,
  };

  instance.post(url, body)
    .then(response => resolve(get(response, ['data', 'attributes'])))
    .catch(error => reject(error));
});

const patchRequest = async ({
  version,
  path,
  attributes,
}) => new Promise(async (resolve, reject) => {
  const url = createFullUrl({ version, path });
  const body = {
    ...attributes,
  };

  instance.patch(url, body)
    .then(response => resolve(get(response, ['data', 'attributes'])))
    .catch(error => reject(error));
});

export {
  getRequest,
  postRequest,
  patchRequest,
  createFullUrl,
};
