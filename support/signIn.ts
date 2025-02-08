import loginFields from "../page_objects/login.ts";

export const populateUsername = async function (page) {
  return await page.locator(loginFields.username());
};
export const populatePassword = async function (page) {
  return await page.locator(loginFields.password());
};
export const clickSubmitButton = async function (page) {
  await page.locator(loginFields.submitButton()).click();
};
export const getErrorMsg = async function(page) {
  return await page.locator(loginFields.signInErrorMsg())
}
export const loginAsUser = async function (
  page,
  username: string,
  password: string
) {
  await populateUsername(page).then((locator) => locator.fill(username));
  await populatePassword(page).then((locator) => locator.fill(password));
  await clickSubmitButton(page);
};
