import { test, expect } from "@playwright/test";
import signinSupport from "../../support/signIn";
import userAccounts from "../../fixtures/userAccounts.json";
import transactionsSupport from "../../support/transactions";

test.describe("Intercept and validate expected payload responses", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signin");
    await signinSupport.loginAsUser(
      page,
      userAccounts.validUser.username,
      userAccounts.validUser.password
    );
  });

  test("[Login] Assert username in response", async ({ page }) => {
    const response = await page.waitForResponse("**/login");
    const responseBody = await response.json();
    expect(responseBody.user.username).toBe(userAccounts.validUser.username);
  });

  test("[Friends Tab] Assert Sender / Receiver not null", async ({ page }) => {
    // click on the Friends Tab
    await transactionsSupport.friendsTab(page).click();
    const res = await page.waitForResponse("**/contacts");
    const body = await res.json();

    // assert receiverNames is not null or undefined.
    const receiverNames = body.results.map((e) => e.receiverName);
    receiverNames.forEach((element) => {
      expect(element).not.toBe(null);
      expect(element).not.toBe(undefined);
    });

    // assert senderNames are not null or undefined.
    const senderNames = body.results.map((e) => e.senderName);
    senderNames.forEach((element) => {
      expect(element).not.toBe(null);
      expect(element).not.toBe(undefined);
    });
  });
});
