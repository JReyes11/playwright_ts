import { test, expect } from "@playwright/test";
import users from "../../fixtures/userAccounts.json";
import { loginAsUser, getErrorMsg } from "../../support/signIn.ts";
import sideNavPageObjects from "../../page_objects/sideNav";

test.describe("Login Tests", async () => {
  test.beforeEach(async ({ page }) => {    
    await page.goto('/signin');
  });

  test("Valid Credentials; Confirm HomeButton", async ({ page }) => {
    await loginAsUser(page, users.validUser.username, users.validUser.password);
    await page.locator(sideNavPageObjects.homeButton()).isVisible();
  });

  test("InValid Credentials; Confirm Error Message", async ({ page }) => {
    await loginAsUser(page, users.invalidUser.username, users.invalidUser.password);
    const errorMsg = await getErrorMsg(page)
    errorMsg.innerText().then((value) => {
      expect(value).toContain("invalid")
    })
  });
});
