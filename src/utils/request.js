import axios from 'axios';
import router from "../router";
import ElementUI from 'element-ui';

axios.defaults.baseURL = "/api";

axios.interceptors.request.use((req) => {
  let token = sessionStorage.getItem("token")
  if (token != null) {
    req.headers.token = token
  }
  return req
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.status == 200) {
    let result = response.data;
    if (result.ecode != 0) {
      ElementUI.Notification.error({
        title: '错误',
        message: `${result.message}`
      });
      return Promise.reject(result.message);
    }
  }
  return response;
}, function (error) {
  if (error.response.status == 401) {
    router.replace({
      path: '/'
    })
    return Promise.reject(error);
  } else {
    // 对响应错误做点什么
    ElementUI.Notification.error({
      title: '错误',
      message: `请求 ${error.config.url}: ${error.message}`
    });
    return Promise.reject(error);
  }
});

const getFun = (url, param) => axios({
  url,
  method: 'get',
  params: param,
}).then(response => response.data.data);

const putFun = (url, param) => axios({
  url,
  method: 'put',
  data: param,
}).then(response => response.data.data);


const delFun = (url, param) => axios({
  url,
  method: 'delete',
  data: param,
}).then(response => response.data.data);


const postFun = (url, param) => axios({
  url,
  method: 'post',
  data: param,
}).then(response => response.data.data);


export default {
  post: postFun,
  delete: delFun,
  put: putFun,
  get: getFun,
}