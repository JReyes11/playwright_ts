class sideNavPageObjects {
    homeButton() {
        return '[data-test="sidenav-home"]';
    }
    bankAccounts() {
        return '[data-test="sidenav-bankaccounts"]'
    }
    notifications() {
        return '[data-test="sidenav-notifications"]'
    }
}
export default new sideNavPageObjects();
