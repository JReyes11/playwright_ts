import { test, expect } from "@playwright/test";
import userCredetials from "../../fixtures/userAccounts.ts";
import login from "../../page_objects/login.ts";
import sideNavigation from "../../page_objects/sideNav";

test.describe("Login Tests", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signin");
  });

  test("Valid Credentials; Confirm HomeButton", async ({page}) => {
    const credentials = userCredetials.validUser();
    await login.loginAsUser(page, credentials);
    await sideNavigation.homeButton(page).isVisible();
  });

  test("Invalid Credentials; Confirm login failure", async ({ page: Page }) => {
    const credentials = userCredetials.invalidUser();
    await login.loginAsUser(Page, credentials);
    const errorMsg = await login.getErrorMessage(Page);
    await errorMsg.innerText().then((value) => {
      expect(value).toContain("invalid");
    });
  });
});
