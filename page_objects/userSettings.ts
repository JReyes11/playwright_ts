import { Page } from "@playwright/test";

class userSettings {
  public userFirstName(page: Page) {
    return page.locator("[data-test=user-settings-firstName-input]");
  }
  public userLastName(page: Page) {
    return page.locator("[data-test=user-settings-lastName-input]");
  }
  public userEmail(page: Page) {
    return page.locator("[data-test=user-settings-email-input]");
  }
  public phoneNumber(page: Page) {
    return page.locator("[data-test=user-settings-phoneNumber-input]");
  }
  public saveButton(page: Page) {
    return page.locator("[data-test=user-settings-submit]");
  }
  async updatePhoneNumber(page: Page, phoneNumber: string) {
    const field = this.phoneNumber(page);
    field.clear();
    field.fill(phoneNumber);
  }
}

export default new userSettings();
