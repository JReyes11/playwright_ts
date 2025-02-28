import { test } from "@playwright/test";
import signup from "../../page_objects/signup.ts";
import sideNavigation from "../../page_objects/sideNav";

test.describe("SignUp Tests", async () => {
  let userSignUp: signup
  let sideNav: sideNavigation
  test.beforeEach(async ({ page }) => {    
    userSignUp = signup.create(page)
    sideNav = sideNavigation.create(page)
    await page.goto('/signup');    
  });
  test("Populate and submit signup form", async () => {      
    const newUserData = userSignUp.generateUserData()
    await userSignUp.signupAndSubmit(newUserData);    
    await sideNav.homeButton().isVisible();
  });
});
