import {AsyncStorage} from 'react-native';
import axios from "axios";
//const URL = "http://10.0.29.24:3000/";
export const URL = 'https://hsaapi.herokuapp.com/';
//export const URL = "http://10.0.28.204:3000/";

const API_URL = URL + 'api/';

//Login
const URL_LOGIN_OTP_GENERATE = API_URL + 'user/generate-otp';
const URL_LOGIN = API_URL + 'user/signin';
const URL_GOOGLE_LOGIN = API_URL + 'user/google';
const URL_FACEBOOK_LOGIN = API_URL + 'user/facebook';

//Register
const URL_GENERATE_OTP = API_URL + 'user/send-otp/';
const URL_VERIFY_OTP = API_URL + 'user/verify-otp/';
const URL_REGISTER = API_URL + 'user/signup/';
const URL_ADDADDRESS = API_URL + 'user/address';
const URL_DELETEADDRESS = API_URL + 'user/address/';
const URL_UPDATEADDRESS = API_URL + 'user/address/';
const URL_UPDATEPROFILE = API_URL + 'user';

//Other
const URL_GET_CATEGORIES = API_URL + 'categories/';
const URL_GET_SUB_CATEGORIES = API_URL + 'sub-categories/';
const URL_GET_FAQ = API_URL + 'faq';
const URL_GETQUERIES = API_URL + 'contact-us';
const URL_ADDQUERY = API_URL + 'contact-us';
const URL_UPLOAD_REQUST_IMAGE = API_URL + 'aws/upload'; //aws/uploadBase64Image
const URL_CREATE_SERVICE_REQUEST = API_URL + 'service/user';
const URL_CHECK_SERVICE_REQUEST = API_URL + 'service/user';
const URL_GET_SERVICE_REQUEST = API_URL + 'service/user';
const URL_PAYMENT_REQUEST = API_URL + 'payment';
const URL_REVIEW_REQUEST = API_URL + 'review/customer';
const URL_RAISE_COMPLAINT = API_URL + 'service/user/complain';
const URL_CITIES = API_URL + 'cities';

export const Api = {
  loginOtpGenerate: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_LOGIN_OTP_GENERATE);
  },
  login: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_LOGIN);
  },
  googleLogin: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_GOOGLE_LOGIN);
  },
  facebookLogin: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_FACEBOOK_LOGIN);
  },
  generateOtp: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_GENERATE_OTP);
  },
  verifyOTP: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_VERIFY_OTP);
  },
  register: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_REGISTER);
  },
  getCategories: (onResponse, data) => {
    request(onResponse, data, 'GET', URL_GET_CATEGORIES);
  },
  getSubCategories: (onResponse, data) => {
    request(
      onResponse,
      data,
      'GET',
      API_URL + 'categories/' + data.category_id + '/sub-categories/',
    );
    //categories/1/sub-categories
  },
  applyPromoCode: (onResponse, data) => {
    request(
      onResponse,
      data,
      'GET',
      API_URL +
        'promo-code/' +
        data.promo_code +
        '/apply?category_id=' +
        data.category_id,
    );
  },
  userProfile: (onResponse, data, header) => {
    request(onResponse, data, 'GET', API_URL + 'user', header);
  },
  addAddress: (onResponse, data, header) => {
    console.log('Request Header', header);
    request(onResponse, data, 'POST', URL_ADDADDRESS, header);
  },
  getFaq: (onResponse, data) => {
    request(onResponse, data, 'GET', URL_GET_FAQ);
  },
  deleteAddress: (onResponse, data) => {
    request(onResponse, data, 'DELETE', URL_DELETEADDRESS + data.address_id);
  },
  updateAddress: (onResponse, data) => {
    let req = JSON.parse(data);
    console.log('bsdk ', req);
    request(onResponse, data, 'PUT', URL_UPDATEADDRESS + req.id);
  },
  updateProfile: (onResponse, data) => {
    request(onResponse, data, 'PUT', URL_UPDATEPROFILE);
  },
  getQueries: (onResponse, data) => {
    request(
      onResponse,
      data,
      'GET',
      URL_GETQUERIES + '?page=' + data.page + '&items=' + data.item,
    );
  },
  addQuery: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_ADDQUERY);
  },
  uplaodRequestIamges: (onResponse, data, header) => {
    request(onResponse, data, 'POST', URL_UPLOAD_REQUST_IMAGE, header);
  },
  createServiceRequest: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_CREATE_SERVICE_REQUEST);
  },
  checkServiceRequest: (onResponse, data) => {
    request(
      onResponse,
      data,
      'GET',
      URL_CHECK_SERVICE_REQUEST + '/' + data.service_id,
    );
  },
  getServiceRequests: (onResponse, data) => {
    request(onResponse, data, 'GET', URL_GET_SERVICE_REQUEST);
  },
  getServiceRequestById: (onResponse, data) => {
    request(
      onResponse,
      data,
      'GET',
      URL_CHECK_SERVICE_REQUEST + '/' + data.service_id,
    );
  },
  updateQuoteStatus: (onResponse, data) => {
    let req = JSON.stringify(data);
    request(
      onResponse,
      req,
      'PUT',
      URL_CREATE_SERVICE_REQUEST + '/' + data.service_id,
    );
  },
  updateStatus: (onResponse, data) => {
    let req = JSON.stringify(data);
    request(
      onResponse,
      req,
      'PUT',
      URL_CREATE_SERVICE_REQUEST + '/' + data.service_id,
    );
  },
  makePayment: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_PAYMENT_REQUEST);
  },
  review: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_REVIEW_REQUEST);
  },
  raiseCompaint: (onResponse, data) => {
    request(onResponse, data, 'POST', URL_RAISE_COMPLAINT);
  },
  getCities: (onResponse, data) => {
    request(onResponse, data, 'GET', URL_CITIES);
  },
};

const getRequestData = data => {
  let dataStr = '';
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      dataStr +=
        dataStr == '' ? key + '=' + data[key] : '&' + key + '=' + data[key];
    }
  }
  return dataStr;
};

export const buildHeader = (headerParams = {}) => {
  var header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  };
  Object.assign(header, headerParams);

  console.log('header', header);
  return header;
};
export const buildHeader1 = (headerParams = {}) => {
  var header = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'Cache-Control': 'no-cache',
  };
  Object.assign(header, headerParams);

  console.log('header1', header);
  return header;
};

async function request(
  onResponse,
  data,
  type,
  featureURL,
  secureRequest = buildHeader(),
) {
  let response = '';
  console.log('API URL', featureURL);
  console.log('Sending Data:', data);
  console.log('Sending Header:', secureRequest);
  var token = await AsyncStorage.getItem('token');
  //console.log("Token", token);
  if (token) {
    if (secureRequest.upload === 'upload') {
      secureRequest = buildHeader1({access_token: token});
    } else {
      secureRequest = buildHeader({access_token: token});
    }
  }
  // console.log('Sending Header:', secureRequest);
  try {
    // axios({
    //   method: type,
    //   url: featureURL,
    //   headers: secureRequest,
    //   data: data,
    // })
    //   .then(function(response) {
    //     console.log('Response', response.data);
    //     if (response.data.status == 'success') {
    //       onResponse.success(response.data);
    //     } else {
    //       onResponse.error(response.data);
    //     }
    //     if (onResponse.complete) {
    //       onResponse.complete();
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log('Response', responseJSON);
    //     onResponse.error(error.data);
    //   });
    if (type === 'GET') {
        //TODO PARAMETER CHECK
        response = await fetch(featureURL, {
            method: type,
            headers: secureRequest
        });
    }
    else if(type == "POST"){
        response = await fetch(featureURL, {
            method: type,
            headers: secureRequest,
            body: data
        });
    } else if(type == "PUT"){
        response = await fetch(featureURL, {
            method: type,
            headers: secureRequest,
            body: data
        });
    } else {
        response = await fetch(featureURL, {
            method: type,
            headers: secureRequest
        });
    }
    //console.log({response});
    let responseJSON = await response.json();
    console.log('Response', responseJSON);
    if (responseJSON.status == "success") {
        onResponse.success(responseJSON);
    } else {
        onResponse.error(responseJSON);
    }
    if (onResponse.complete) {
        onResponse.complete();
    }
  } catch (error) {
    console.log('Error catch', error);
    error = 'Service is currently not available, please try again later';
    onResponse.error(error);
    if (onResponse.complete) {
      onResponse.complete();
    }
  }
}
