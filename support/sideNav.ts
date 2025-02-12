import { expect, Page} from "@playwright/test";
import sideNavPageObjects from "../page_objects/sideNav";

class sideNavSupport {
  userFullName(page: Page) {
    return page.locator(sideNavPageObjects.userFullName())
  }
  homeButton(page: Page) {
    return page.locator(sideNavPageObjects.homeButton());
  }
  myAccount(page: Page) {
    return page.locator(sideNavPageObjects.myAccount());
  }
  bankAccounts(page: Page) {
    return page.locator(sideNavPageObjects.bankAccounts());
  }
  notifications(page: Page) {
    return page.locator(sideNavPageObjects.notifications());
  }
  logout(page: Page) {
    return page.locator(sideNavPageObjects.logout());
  }
  async assertSideNavVisible(page: Page) {
    await expect(this.homeButton(page)).toBeVisible();
  }
  async assertSideNavHidden(page: Page) {
    await expect(this.homeButton(page)).toBeHidden();
  }
}

export default new sideNavSupport();
