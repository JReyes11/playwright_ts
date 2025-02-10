import { test, expect } from "@playwright/test";
import signinSupport from "../../support/signIn";
import sideNavSupport from '../../support/sideNav'
import topNavSupport from '../../support/topNav'
import users from "../../fixtures/userAccounts.json";
import userSettings from "../../support/userSettings";
import dayjs from 'dayjs'

test.describe("Side Navigation Test Cases", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await signinSupport.loginAsUser(page, users.validUser.username, users.validUser.password);
  });

  test("Collapse Side Navigation; Assert Elements", async ({ page }) => {
    // by default, the side nav should be open. Assert expected elements.   
    await sideNavSupport.assertSideNavVisible(page)

    // collapse sideNav, Assert elements no longer visible.     
    await topNavSupport.menuIcon(page).click()
    await sideNavSupport.assertSideNavHidden(page)
  });

  test("MyAccount: Collapse Side Navigation, Update User PhoneNumber, Assert network request", async ({ page }) => {
    // by default, the side nav should be open. Assert expected elements.   
    await sideNavSupport.assertSideNavVisible(page)

    // Click on My Account in SideNav,    
    await sideNavSupport.myAccount(page).click()
    
    // then collapse sideNav
    // await page.locator(topNav.menuIcon()).click()
    await topNavSupport.menuIcon(page).click()
    
    // Assert sideNav elements no longer visible. 
    await sideNavSupport.assertSideNavHidden(page) 

    // My Account page:  Update phone number field with mocked number.
    const lastFourNumbers = dayjs().format('mmss')  
    const updatedPhoneNumber = `512-555-${lastFourNumbers}` 
    await userSettings.updatePhoneNumber(page, updatedPhoneNumber)
    await userSettings.saveButton(page).click()

    /* The app does not present a success / failure message, so let's
     intercept the checkAuth network request and confirm the updated phoneNumber
     is included in the response. */
    const networkRequest = await page.waitForResponse('**/checkAuth')
    const response = await networkRequest.json()
    expect(response.user.phoneNumber).toBe(updatedPhoneNumber)


  });
});
