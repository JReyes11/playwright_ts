class topNavigation {
  menuIcon(page) {
    return page.locator("[data-testid=MenuIcon]");
  }
  appNameLogo(page) {
    return page.locator(".NavBar-logo");
  }
  newButton(page) {
    return page.locator("[data-testid=AttachMoneyIcon]");
  }
  notificationsIcon(page) {
    return page.locator("[data-testid=NotificationsIcon]");
  }
}
export default new topNavigation();
