import { test } from "@playwright/test";
import signupSupport from "../../support/signup.ts";
import sideNavPageObjects from "../../page_objects/sideNav";

test.describe("SignUp Tests", async () => {
  test.beforeEach(async ({ page }) => {    
    await page.goto('/signup');
  });

  test("Populate and submit signup form", async ({ page }) => {      
    const newUserData =  await signupSupport.generateUserData()
    await signupSupport.signupAndSubmit(page, newUserData);    
    await page.locator(sideNavPageObjects.homeButton()).isVisible();
  });
});
