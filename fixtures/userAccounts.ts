class userCredentials {
  validUser() {
    return {
      username: "Heath93",
      password: "s3cret",
    };
  }
  invalidUser() {
    return {
      username: "BadUser",
      password: "BadPassword",
    };
  }
}

export default new userCredentials();
