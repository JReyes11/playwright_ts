import { test } from "@playwright/test";
import userCredentials from "../../fixtures/userAccounts";
import transactions from "../../page_objects/transactions";
import login from "../../page_objects/login";
import sideNavigation from '../../page_objects/sideNav.ts'
import mockData from "../../fixtures/mockedResponses.json"

test.describe("Intercept and Mock Responses: Desktop Only.", async () => { 
  let signIn: login
  let payments: transactions
  let sideNav: sideNavigation

  test.beforeEach(async ({ page }) => {
    signIn = login.create(page)  
    payments = transactions.create(page)
    sideNav = sideNavigation.create(page)
    const projectName = test.info().project.name;
    if (projectName.includes("Mobile")) {
      test.skip();
    }
    await page.goto("/signin");
  });

  test("[Mock] Login and mock user balance", async ({ page }) => {
    await page.route("**/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockData.login),
      });
    });
    const credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);    
    await sideNav.homeButton().isVisible()
  });

  test("Mock Bank Accounts displayed", async ({ page }) => {
    await page.route("**/graphql", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockData.bankAccount)
      });
    });
    const credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);
    await sideNav.bankAccounts().isVisible()
    await sideNav.bankAccounts().click()
    
  });

  test("Notifications: Navigate and mock", async ({ page }) => {
    await page.route("**/notifications", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockData.notifications),
      });
    });
    const credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);    
    await sideNav.notifications().isVisible()
    await sideNav.notifications().click()    
    await page.waitForTimeout(5000);
  });

  test("Mock Mine Tab Transaction data", async ({ page }) => {
    await page.route("**/transactions", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          pageData: {
            page: 1,
            limit: 10,
            hasNextPages: true,
            totalPages: 25,
          },
          results: mockData.mineTabTransaction,
        }),
      });
    });
    const credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);
    await payments.mineTab().click();
    await page.waitForTimeout(5000);
  });
});
