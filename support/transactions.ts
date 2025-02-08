import transactionPageObjects from "../page_objects/transactions";
import { transaction } from "../types/interfaces.ts";

export const newTransactionButton = async function (page) {
  return await transactionPageObjects.moneyIcon(page);
};
export const searchField = async function (page) {
  return await transactionPageObjects.searchBar(page);
};
export const findUserInSearchResults = async function (page, username: string) {
  return await page.locator("span", { hasText: username }).first();
};
export const amountField = async function (page) {
  return await transactionPageObjects.amountField(page);
};
export const notesField = async function (page) {
  return await transactionPageObjects.notesField(page);
};
export const requestPaymentButton = async function (page) {
  return await transactionPageObjects.requestButton(page);
};
export const paymentButton = async function (page) {
  return await transactionPageObjects.payButton(page);
};
export const requestPayment = async function (page, dataObject: transaction) {
  await newTransactionButton(page).then((locator) => locator.click());
  await searchField(page).then((locator) => locator.fill(dataObject.name));
  await findUserInSearchResults(page, dataObject.username).then((locator) =>
    locator.click()
  );
  await amountField(page).then((locator) => locator.fill(dataObject.amount));
  await notesField(page).then((locator) => locator.fill(dataObject.note));
  await requestPaymentButton(page).then((locator) => locator.click());
};
export const makePayment = async function(page, dataObject: transaction) {
    await newTransactionButton(page).then((locator) => locator.click());
  await searchField(page).then((locator) => locator.fill(dataObject.name));
  await findUserInSearchResults(page, dataObject.username).then((locator) =>
    locator.click()
  );
  await amountField(page).then((locator) => locator.fill(dataObject.amount));
  await notesField(page).then((locator) => locator.fill(dataObject.note));
  await paymentButton(page).then(locator => locator.click())
}
