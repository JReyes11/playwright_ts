import { test, Page } from "@playwright/test";
import signup from "../../page_objects/signup.ts";
import sideNavigation from "../../page_objects/sideNav";

test.describe("SignUp Tests", async () => {
  test.beforeEach(async ({ page }) => {    
    await page.goto('/signup');
  });
  test("Populate and submit signup form", async ({ page }) => {      
    const newUserData = signup.generateUserData()
    await signup.signupAndSubmit(page, newUserData);    
    await sideNavigation.homeButton(page).isVisible();
  });
});
