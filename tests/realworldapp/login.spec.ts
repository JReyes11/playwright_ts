import { test, expect, Page } from "@playwright/test";
import users from "../../fixtures/userAccounts.json";
import signinSupport from "../../support/signIn.ts";
import sideNavSupport from "../../support/sideNav.ts"

test.describe("Login Tests", async () => {
  test.beforeEach(async ({ page }) => {    
    await page.goto('/signin');
  });

  test("Valid Credentials; Confirm HomeButton", async ({ page }: {page: Page}) => {
    await signinSupport.loginAsUser(page, users.validUser);    
    await sideNavSupport.homeButton(page).isVisible();
  });

  test("InValid Credentials; Confirm Error Message", async ({ page }: {page: Page}) => {
    await signinSupport.loginAsUser(page, users.invalidUser);
    const errorMsg = await signinSupport.getErrorMsg(page)
    errorMsg.innerText().then((value) => {
      expect(value).toContain("invalid")
    })
  });
});
