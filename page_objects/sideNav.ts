import { expect } from "@playwright/test";

class sideNavigation {
  public userFullName(page) {
    return page.locator("[data-test=sidenav-user-full-name]");
  }
  public homeButton(page) {
    return page.locator('[data-test="sidenav-home"]');
  }
  public myAccount(page) {
    return page.locator("[data-test=sidenav-user-settings]");
  }
  public bankAccounts(page) {
    return page.locator('[data-test="sidenav-bankaccounts"]');
  }
  public notifications(page) {
    return page.locator('[data-test="sidenav-notifications"]');
  }
  public logout(page) {
    return page.locator("[data-testid=ExitToAppIcon]");
  }
  async assertMenuDisplayed(page) {
    await expect(this.userFullName(page)).toBeVisible();
    await expect(this.homeButton(page)).toBeVisible();
    await expect(this.myAccount(page)).toBeVisible();
    await expect(this.notifications(page)).toBeVisible();
    await expect(this.logout(page)).toBeVisible();
  }
  async assertMenuNotDisplayed(page) {
    await expect(this.userFullName(page)).toBeHidden();
    await expect(this.homeButton(page)).toBeHidden();
    await expect(this.myAccount(page)).toBeHidden();
    await expect(this.notifications(page)).toBeHidden();
    await expect(this.logout(page)).toBeHidden();
  }
}
export default new sideNavigation();
