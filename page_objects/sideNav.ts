class sideNavPageObjects {
  homeButton() {
    return '[data-test="sidenav-home"]';
  }
  myAccount() {
    return "[data-test=sidenav-user-settings]";
  }
  bankAccounts() {
    return '[data-test="sidenav-bankaccounts"]';
  }
  notifications() {
    return '[data-test="sidenav-notifications"]';
  }
  logout() {
    return '[data-testid=ExitToAppIcon]'
  }
}
export default new sideNavPageObjects();
