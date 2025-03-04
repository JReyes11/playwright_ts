import { test, expect } from "@playwright/test";
import login from "../../page_objects/login";
import sideNavigation from "../../page_objects/sideNav";
import topNavigation from "../../page_objects/topNav";
import userSettings from "../../page_objects/userSettings";
import userCredentials from "../../fixtures/userAccounts";
import helper from "../../support/helper";

test.describe("Side Navigation: Desktop Browsers Only.", async () => {  
  let sideNav: sideNavigation
  let topNav: topNavigation
  let settings: userSettings
  test.beforeEach(async ({ page }) => {
    const signIn = login.create(page)
    sideNav = sideNavigation.create(page)
    topNav = topNavigation.create(page)
    settings = userSettings.create(page)
    const projectName = test.info().project.name;
    if (projectName.includes("Mobile")) {
      test.skip();
    }
    await page.goto("/");
    const credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);
  });

  test("Collapse Side Navigation; Assert Elements", async () => {
    await sideNav.assertMenuDisplayed() // assert side menu displayed
    await topNav.menuIcon().click(); // click hamburger button to hide side menu
    await sideNav.assertMenuNotDisplayed() // assert side menu no longer displayed
  });

  test("Update PhoneNumber, Incercept network request, Assert response", async ({page}) => {    
    await sideNav.assertMenuDisplayed() // assert side menu displayed    
    await sideNav.myAccount().click();
    await topNav.menuIcon().click();
    await sideNav.assertMenuNotDisplayed() // assert side menu no longer displayed

    // My Account page:  Update phone number field with mocked number.
    const updatedPhoneNumber = helper.randomPhoneNumber();
    await settings.updatePhoneNumber(updatedPhoneNumber);
    await settings.saveButton().click();

    // Assert success by intercepting network request.    
    const networkRequest = await page.waitForResponse("**/checkAuth");
    const response = await networkRequest.json();
    expect(response.user.phoneNumber).toBe(updatedPhoneNumber);
  });
});
