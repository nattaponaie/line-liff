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
  path,
  service,
  namespace,
  attributes,
}) => new Promise(async (resolve, reject) => {
  const url = createFullUrl({ path, service, namespace });
  const body = {
    data: {
      attributes,
    },
  };

  instance.post(url, body)
    .then(response => resolve(response))
    .catch(error => reject(new Error(`POST ${path} ${error.message}`)));
});

const putRequest = async ({
  path,
  service,
  namespace,
  attributes,
}) => new Promise(async (resolve, reject) => {
  const url = createFullUrl({ path, service, namespace });
  const body = {
    data: {
      attributes,
    },
  };

  instance.put(url, body)
    .then(response => resolve(response))
    .catch(error => reject(new Error(`PUT ${path} ${error.message}`)));
});

export {
  getRequest,
  postRequest,
  putRequest,
};
