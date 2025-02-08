import { test } from "@playwright/test";
import users from "../../fixtures/userAccounts.json";
import { loginAsUser } from "../../support/signIn.ts";
import sideNavPageObjects from "../../page_objects/sideNav.ts";
import transactionPageObjects from "../../page_objects/transactions.ts";

test.describe("Intercept and Mock Responses", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/signin");
  });

  test("[Mock] Login and mock user balance", async ({ page }) => {
    await page.route("**/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          user: {
            username: "Mocked",
            balance: 9999999,
          },
        }),
      });
    });
    await loginAsUser(page, users.validUser.username, users.validUser.password);
    await page.locator(sideNavPageObjects.homeButton()).isVisible();
  });

  test("Mock Bank Accounts displayed", async ({ page }) => {
    await page.route("**/graphql", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            listBankAccount: [
              {
                bankName: "Mickey Mouse Club Bank",
              },
            ],
          },
        }),
      });
    });
    await loginAsUser(page, users.validUser.username, users.validUser.password);
    await page.locator(sideNavPageObjects.bankAccounts()).isVisible();
    await page.locator(sideNavPageObjects.bankAccounts()).click();
  });

  test("Notifications: Navigate and mock", async ({ page }) => {
    await page.route("**/notifications", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          results: [
            {
              userFullName: "Megatron",
              id: "jgjFl9WiDC",
              uuid: "8a0e8b3f-e9c5-4216-aedc-9c8ceb043884",
              userId: "M1ty1gR8B3",
              transactionId: "bBixZl9HG",
              status: "Demanded",
              isRead: false,
              createdAt: "2025-01-05T21:05:14.141Z",
              modifiedAt: "2025-01-05T21:05:14.141Z",
            },
          ],
        }),
      });
    });
    await loginAsUser(page, users.validUser.username, users.validUser.password);
    await page.locator(sideNavPageObjects.notifications()).isVisible();
    await page.locator(sideNavPageObjects.notifications()).click();
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
          results: [
            {
              receiverName: "Batman",
              senderName: "Superman",
              receiverAvatar: "https://api.dicebear.com/9.x/bottts/svg",
              senderAvatar:
                "https://api.dicebear.com/9.x/identicon/svg?seed=Andrea",
              likes: [],
              comments: [],
              id: "bBixZl9HG",
              uuid: "c8c93a38-c62f-47f6-8ece-1a7a55603f73",
              amount: 31943,
              description: "BatMobile Rental",
              receiverId: "M1ty1gR8B3",
              senderId: "uBmeaz5pX",
              privacyLevel: "public",
              status: "complete",
              createdAt: "2025-01-05T21:05:14.129Z",
              modifiedAt: "2025-01-05T21:05:14.129Z",
            },
          ],
        }),
      });
    });

    await loginAsUser(page, users.validUser.username, users.validUser.password);
    await transactionPageObjects.mineTab(page).click();
    await page.waitForTimeout(5000);
  });
});
