function getBaseURL() {
  let hostname = window.location.hostname;
  if (hostname.includes('local')) {
    return 'http://localhost:3001';
  }
  return 'https://idp.kabbalah.com';
}

export default {
  POST_REGISTRATION_URL:  getBaseURL() + '/api-2017/users',
  GET_TEACHERS_URL: getBaseURL() + '/api-2017/get-teachers',
  CHECK_USER_EXISTS_URL: getBaseURL() + '/api-2017/users/exists',
}