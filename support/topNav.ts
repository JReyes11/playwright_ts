import topNav from "../page_objects/topNav";

class topNavSupport {
  menuIcon(page) {
    return page.locator(topNav.menuIcon());
  }
  appNameLogo(page) {
    return page.locator(topNav.appNameLogo());
  }
  newButton(page) {
    return page.locator(topNav.newButton());
  }
  notificationsIcon(page) {
    return page.locator(topNav.notificationsIcon());
  }
}

export default new topNavSupport();
