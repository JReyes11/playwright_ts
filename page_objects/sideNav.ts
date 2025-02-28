import { expect, Page } from "@playwright/test";

class sideNavigation { 
  private page: Page; 
  constructor(page: Page) {
    this.page = page;
  }
  static create(page: Page) {
    return new sideNavigation(page);
  }
  public userFullName() {
    return this.page.locator("[data-test=sidenav-user-full-name]");
  }
   public homeButton() {
    return this.page.locator('[data-test="sidenav-home"]');
  }
  public myAccount() {
    return this.page.locator("[data-test=sidenav-user-settings]");
  }
  public bankAccounts() {
    return this.page.locator('[data-test="sidenav-bankaccounts"]');
  }
  public notifications() {
    return this.page.locator('[data-test="sidenav-notifications"]');
  }
  public logout() {
    return this.page.locator("[data-testid=ExitToAppIcon]");
  }
  async assertMenuDisplayed() {
    await expect(this.userFullName()).toBeVisible();
    await expect(this.homeButton()).toBeVisible();
    await expect(this.myAccount()).toBeVisible();
    await expect(this.notifications()).toBeVisible();
    await expect(this.logout()).toBeVisible();
  }
  async assertMenuNotDisplayed() {
    await expect(this.userFullName()).toBeHidden();
    await expect(this.homeButton()).toBeHidden();
    await expect(this.myAccount()).toBeHidden();
    await expect(this.notifications()).toBeHidden();
    await expect(this.logout()).toBeHidden();
  }
}
export default sideNavigation;
