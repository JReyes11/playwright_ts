import { test, expect } from "@playwright/test";
import userCredetials from "../../fixtures/userAccounts.ts";
import login from "../../page_objects/login.ts";
import sideNavigation from "../../page_objects/sideNav";

test.describe("Login Tests", async () => {
  let signIn: login
  let sideNav: sideNavigation
  test.beforeEach(async ({ page }) => {
    signIn = login.create(page)
    sideNav = sideNavigation.create(page)
    await page.goto("/signin");
  });

  test("Valid Credentials; Confirm HomeButton", async () => {
    const credentials = userCredetials.validUser();
    await signIn.loginAsUser(credentials);
    await sideNav.homeButton().isVisible();
  });

  test("Invalid Credentials; Confirm login failure", async () => {
    const credentials = userCredetials.invalidUser();
    await signIn.loginAsUser(credentials);
    const errorMsg = await signIn.getErrorMessage();
    await errorMsg.innerText().then((value) => {
      expect(value).toContain("invalid");
    });
  });
});
