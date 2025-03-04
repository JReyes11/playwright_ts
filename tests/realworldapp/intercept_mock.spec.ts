import { test } from "@playwright/test";
import userCredentials from "../../fixtures/userAccounts";
import transactions from "../../page_objects/transactions";
import login from "../../page_objects/login";
import sideNavigation from "../../page_objects/sideNav.ts";
import mockData from "../../fixtures/mockedResponses.json";
import requests from "../../support/api.ts";

test.describe("Intercept and Mock Responses: Desktop Only.", async () => {
  let signIn: login;
  let payments: transactions;
  let sideNav: sideNavigation;
  let req: requests;

  test.beforeEach(async ({ page }) => {
    signIn = login.create(page);
    payments = transactions.create(page);
    sideNav = sideNavigation.create(page);
    req = requests.create(page);
    const projectName = test.info().project.name;
    if (projectName.includes("Mobile")) {
      test.skip();
    }
    await page.goto("/signin");
  });

  test("[Mock] Login and mock user balance", async () => {
    const config = {
      endpoint: "**/login",
      expectedStatus: 200,
      contentType: "application/json",
      objName: mockData.login,
    };
    await req.waitForRoute(config);
    const credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);
  });

  test("Mock Bank Accounts displayed", async () => {
    const config = {
      endpoint: "**/graphql",
      expectedStatus: 200,
      contentType: "application/json",
      objName: mockData.bankAccount,
    };
    await req.waitForRoute(config);
    const credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);
    await sideNav.bankAccounts().click();
  });

  test("Notifications: Navigate and mock", async ({ page }) => {
    const config = {
      endpoint: "**/notifications",
      expectedStatus: 200,
      contentType: "application/json",
      objName: mockData.notifications,
    };
    await req.waitForRoute(config);
    const credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);
    await sideNav.notifications().isVisible();
    await sideNav.notifications().click();
    await page.waitForTimeout(5000);
  });

  test("Mock Mine Tab Transaction data", async () => {
    const config = {
      endpoint: "**/notifications",
      expectedStatus: 200,
      contentType: "application/json",
      objName: {
        pageData: {
          page: 1,
          limit: 10,
          hasNextPages: true,
          totalPages: 25,
        },
        results: mockData.mineTabTransaction,
      },
    };
    await req.waitForRoute(config);
    const credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);
    await payments.mineTab().click();    
  });
});
