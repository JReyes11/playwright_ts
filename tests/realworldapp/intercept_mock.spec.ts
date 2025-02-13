import { test, Page } from "@playwright/test";
import users from "../../fixtures/userAccounts.json";
import signinSupport from "../../support/signIn.ts";
import transactionsSupport from '../../support/transactions.ts'
import sideNavSupport from '../../support/sideNav.ts'
import mockData from "../../fixtures/mockedResponses.json"

test.describe("Intercept and Mock Responses: Desktop Only.", async () => { 
  test.beforeEach(async ({ page }: {page: Page}) => {
    const projectName = test.info().project.name;
    if (projectName.includes("Mobile")) {
      test.skip();
    }
    await page.goto("/signin");
  });

  test("[Mock] Login and mock user balance", async ({ page }: {page: Page}) => {
    await page.route("**/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockData.login),
      });
    });
    await signinSupport.loginAsUser(page, users.validUser);    
    await sideNavSupport.homeButton(page).isVisible()
  });

  test("Mock Bank Accounts displayed", async ({ page }: {page: Page}) => {
    await page.route("**/graphql", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockData.bankAccount)
      });
    });
    await signinSupport.loginAsUser(page, users.validUser);
    await sideNavSupport.bankAccounts(page).isVisible()
    await sideNavSupport.bankAccounts(page).click()
    
  });

  test("Notifications: Navigate and mock", async ({ page }: {page: Page}) => {
    await page.route("**/notifications", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockData.notifications),
      });
    });
    await signinSupport.loginAsUser(page, users.validUser);
    await sideNavSupport.notifications(page).isVisible()
    await sideNavSupport.notifications(page).click()    
    await page.waitForTimeout(5000);
  });

  test("Mock Mine Tab Transaction data", async ({ page }: {page: Page}) => {
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

    await signinSupport.loginAsUser(page, users.validUser);
    await transactionsSupport.mineTab(page).click();
    await page.waitForTimeout(5000);
  });
});
