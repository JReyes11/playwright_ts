import { test, expect, Page } from "@playwright/test";
import login from "../../page_objects/login";
import userCredentials from "../../fixtures/userAccounts";
import transactions from "../../page_objects/transactions";

test.describe("Intercept and validate expected payload responses", async () => {
  let credentials;
  test.beforeEach(async ({ page }) => {
    await page.goto("/signin");
    credentials = userCredentials.validUser();
    await login.loginAsUser(page, credentials);
  });

  test("[Login] Assert username in response", async ({ page }) => {
    const response = await page.waitForResponse("**/login");
    const responseBody = await response.json();
    expect(responseBody.user.username).toBe(credentials.username);
  });

  test("[Friends Tab] Assert Sender / Receiver not null", async ({ page }) => {
    // click on the Friends Tab, Asser sender and receiver names not null or undefined.
    await transactions.friendsTab(page).click();
    const res = await page.waitForResponse("**/contacts");
    const body = await res.json();
    const receiverNames = body.results.map((e) => e.receiverName);
    receiverNames.forEach((element) => {
      expect(element).not.toBe(null);
      expect(element).not.toBe(undefined);
    });
    const senderNames = body.results.map((e) => e.senderName);
    senderNames.forEach((element) => {
      expect(element).not.toBe(null);
      expect(element).not.toBe(undefined);
    });
  });
});
