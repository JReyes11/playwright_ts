import { test, expect, Page } from "@playwright/test";
import login from "../../page_objects/login";
import sideNavigation from "../../page_objects/sideNav";
import topNavigation from "../../page_objects/topNav";
import userSettings from "../../page_objects/userSettings";
import userCredentials from "../../fixtures/userAccounts";
import helper from "../../support/helper";

test.describe("Side Navigation: Desktop Browsers Only.", async () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    const projectName = test.info().project.name;
    if (projectName.includes("Mobile")) {
      test.skip();
    }
    await page.goto("/");
    const credentials = userCredentials.validUser();
    await login.loginAsUser(page, credentials);
  });

  test("Collapse Side Navigation; Assert Elements", async ({page}) => {
    await sideNavigation.assertMenuDisplayed(page) // assert side menu displayed
    await topNavigation.menuIcon(page).click(); // click hamburger button to hide side menu
    await sideNavigation.assertMenuNotDisplayed(page) // assert side menu no longer displayed
  });

  test("Update PhoneNumber, Incercept network request, Assert response", async ({page,}) => {    
    await sideNavigation.assertMenuDisplayed(page) // assert side menu displayed    
    await sideNavigation.myAccount(page).click();
    await topNavigation.menuIcon(page).click();
    await sideNavigation.assertMenuNotDisplayed(page) // assert side menu no longer displayed

    // My Account page:  Update phone number field with mocked number.
    const updatedPhoneNumber = await helper.randomPhoneNumber();
    await userSettings.updatePhoneNumber(page, updatedPhoneNumber);
    await userSettings.saveButton(page).click();

    // Assert success by intercepting network request.    
    const networkRequest = await page.waitForResponse("**/checkAuth");
    const response = await networkRequest.json();
    expect(response.user.phoneNumber).toBe(updatedPhoneNumber);
  });
});
