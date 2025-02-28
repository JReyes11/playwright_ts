import { Page } from "@playwright/test";

class topNavigation {
  private page: Page
  constructor(page: Page) {
    this.page = page;
  }
  static create(page: Page) {
    return new topNavigation(page)
  }
  menuIcon(page: Page) {
    return page.locator("[data-testid=MenuIcon]");
  }
  appNameLogo(page: Page) {
    return page.locator(".NavBar-logo");
  }
  newButton(page: Page) {
    return page.locator("[data-testid=AttachMoneyIcon]");
  }
  notificationsIcon(page: Page) {
    return page.locator("[data-testid=NotificationsIcon]");
  }
}
export default topNavigation;
