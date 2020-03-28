import Axios from 'axios';

const { CancelToken } = Axios;

const baseUrlMap = {
  development: '',
  preProduction: '',
  production: '',
};

const baseConfig = {
  baseURL: baseUrlMap[window.ENV],
  timeout: 10000,
  headers: {

  },
};

const Http = Axios.create(baseConfig);

Http.interceptors.request.use((config) => {
  const currentConfig = { ...config };
  const token = sessionStorage.getItem('token');
  if (token) {
    currentConfig.header.token = token;
  }

  return currentConfig;
});

Http.interceptors.response.use((res) => {
  const { data } = res;
  // 可自行更改
  if (data.success && data.code === '200') {
    return data.data;
  }

  return {
    success: false,
    code: data.code,
    message: data.message,
  };
});

const request = (config, isCancel = false) => {
  let cancel = null;
  const cancelToken = new CancelToken((c) => { cancel = c; });
  const req = Http.request({
    ...config,
    cancelToken,
  });

  if (isCancel) {
    return {
      http: req,
      cancel,
    };
  }

  return req;
};

export const createAjaxAction = (startAction, endAction) => (api, success, fail) => (dispatch) => {
  if (startAction) {
    dispatch(startAction());
  }
  return api.then((res) => {
    if (success) {
      success(res);
    }
    dispatch(endAction(res));
  }).catch((err) => {
    if (fail) {
      fail({ err });
    }
    dispatch(endAction());
  });
};

export default request;
