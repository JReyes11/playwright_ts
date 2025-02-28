import { expect, Page } from "@playwright/test";


class sideNavigation { 
  public userFullName(page: Page) {
    return page.locator("[data-test=sidenav-user-full-name]");
  }
  public homeButton(page: Page) {
    return page.locator('[data-test="sidenav-home"]');
  }
  public myAccount(page: Page) {
    return page.locator("[data-test=sidenav-user-settings]");
  }
  public bankAccounts(page: Page) {
    return page.locator('[data-test="sidenav-bankaccounts"]');
  }
  public notifications(page: Page) {
    return page.locator('[data-test="sidenav-notifications"]');
  }
  public logout(page: Page) {
    return page.locator("[data-testid=ExitToAppIcon]");
  }
  async assertMenuDisplayed(page: Page) {
    await expect(this.userFullName(page)).toBeVisible();
    await expect(this.homeButton(page)).toBeVisible();
    await expect(this.myAccount(page)).toBeVisible();
    await expect(this.notifications(page)).toBeVisible();
    await expect(this.logout(page)).toBeVisible();
  }
  async assertMenuNotDisplayed(page: Page) {
    await expect(this.userFullName(page)).toBeHidden();
    await expect(this.homeButton(page)).toBeHidden();
    await expect(this.myAccount(page)).toBeHidden();
    await expect(this.notifications(page)).toBeHidden();
    await expect(this.logout(page)).toBeHidden();
  }
}
export default new sideNavigation();
