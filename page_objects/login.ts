class loginFields {
  username() {    
    return '#username';
  }
  password() {
    return "#password";
  }
  rememberMe() {
    return '[data-test="signin-remember-me"]';
  }
  submitButton() {
    return '[data-test="signin-submit"]';
  }
  signInErrorMsg() {
    return "[data-test=signin-error]"
  }
}
export default new loginFields();
