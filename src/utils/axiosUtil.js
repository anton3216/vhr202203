import axios from 'axios';
import {
  Message
} from 'element-ui';

axios.interceptors.response.use(
  success => {
    // 因为后端代码通过HTTP协议返回的代码是200
    // 所以在我们看来即使是登录异常返回的status也是200
    // 所以我们需要在这些200中找出我们自己定义的500
    // 1. success对象中有这个status属性
    // 2. success对象中有这个status属性的值是 200
    // 3. 我们自己响应的数据(data)中status是500
    if (success.status && success.status == 200 && success.data.status == 500) {
      Message.error(success.data.msg);
      return;
    }
    if (success.data.msg) {
      Message.success(success.data.msg);
    }
    return success.data;
  },
  error => {
    if (error.response.status == 504 || error.response.status == 404) {
      Message.error('ORZ,服务器被吃了');
    } else if (error.response.status == 403) {
      Message.error('没有权限,请联系管理员处理!');
    } else if (error.response.status == 401) {
      Message.error(error.response.data.msg ? error.response.data.msg : '尚未登录,请先登录!');
    } else {
      if (error.response.data.msg) {
        Message.error(error.response.data.msg);
      } else {
        Message.error('未知错误');
      }
    }
  });

let pirfix = '';

// 封装登录请求使用的axios
// 只能使用post key=value
export default {
  postKeyValueRequest: function(url, params) {
    return axios({
      method: 'post',
      url: `${pirfix}${url}`,
      data: params,
      transformRequest: [
        function(data) {
          let str = '';
          for (let i in data) {
            str += '&' + encodeURIComponent(i) + "=" + encodeURIComponent(data[i]);
          }
          return str.substring(1);
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  postRequest: function(url, params) {
    return axios({
      method: 'post',
      url: `${pirfix}${url}`,
      data: params
    })
  },
  getRequest: function(url, params) {
    return axios({
      method: 'get',
      url: `${pirfix}${url}`,
      data: params
    })
  },
  putRequest: function(url, params) {
    return axios({
      method: 'put',
      url: `${pirfix}${url}`,
      data: params
    })
  },
  deleteRequest: function(url, params) {
    return axios({
      method: 'delete',
      url: `${pirfix}${url}`,
      data: params
    })
  }
};
