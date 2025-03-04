import { Page } from "@playwright/test";

class topNavigation {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  static create(page: Page) {
    return new topNavigation(page);
  }
  menuIcon() {
    return this.page.locator("[data-testid=MenuIcon]");
  }
  appNameLogo() {
    return this.page.locator(".NavBar-logo");
  }
  newButton() {
    return this.page.locator("[data-testid=AttachMoneyIcon]");
  }
  notificationsIcon() {
    return this.page.locator("[data-testid=NotificationsIcon]");
  }
}
export default topNavigation;
