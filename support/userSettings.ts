import { Page } from "@playwright/test";
import userSettingsPage from "../page_objects/userSettings";

class userSettings {
  userFirstName(page: Page) {
    return page.locator(userSettingsPage.userFirstName());
  }
  userLastName(page: Page) {
    return page.locator(userSettingsPage.userLastName());
  }
  userEmail(page: Page) {
    return page.locator(userSettingsPage.userEmail());
  }
  phoneNumber(page: Page) {
    return page.locator(userSettingsPage.phoneNumber());
  }
  saveButton(page: Page) {
    return page.locator(userSettingsPage.saveButton());
  }

  updatePhoneNumber = async function (page, phoneNumber) {
    const field = this.phoneNumber(page);
    field.clear();
    field.fill(phoneNumber);
  };
}

export default new userSettings();
