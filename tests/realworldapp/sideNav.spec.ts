import { test, expect, Page } from "@playwright/test";
import signinSupport from "../../support/signIn";
import sideNavSupport from '../../support/sideNav'
import topNavSupport from '../../support/topNav'
import users from "../../fixtures/userAccounts.json";
import userSettings from "../../support/userSettings";
import helper from "../../support/helper"

test.describe("Side Navigation: Desktop Browsers Only.", async () => {
  test.beforeEach(async ({ page }: {page: Page}) => {  
    const projectName = test.info().project.name;
    if (projectName.includes("Mobile")) {
      test.skip();
    }
    await page.goto("/");
    await signinSupport.loginAsUser(page, users.validUser);
  });

  test("Collapse Side Navigation; Assert Elements", async ({ page }: {page: Page}) => {    
    await sideNavSupport.assertSideNavVisible(page)    
    await topNavSupport.menuIcon(page).click()
    await sideNavSupport.assertSideNavHidden(page)
  });

  test("MyAccount: Collapse Side Navigation, Update User PhoneNumber, Assert network request", async ({ page }: {page: Page}) => {
    // by default, the side nav should be open. Assert expected elements.   
    await sideNavSupport.assertSideNavVisible(page)

    // Click on My Account in SideNav, collapse sideNav, assert no longer visible
    await sideNavSupport.myAccount(page).click()        
    await topNavSupport.menuIcon(page).click()        
    await sideNavSupport.assertSideNavHidden(page) 

    // My Account page:  Update phone number field with mocked number.
    const updatedPhoneNumber = await helper.randomPhoneNumber() 
    await userSettings.updatePhoneNumber(page, updatedPhoneNumber)
    await userSettings.saveButton(page).click()

    // Assert success by intercepting network request. 
    // Note: App does not show success message.
    const networkRequest = await page.waitForResponse('**/checkAuth')
    const response = await networkRequest.json()
    expect(response.user.phoneNumber).toBe(updatedPhoneNumber)
  });
});
