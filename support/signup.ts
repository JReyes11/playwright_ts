import signUpObjects from "../page_objects/signup.ts";
import { userSignUp } from "../types/interfaces.ts";
import { faker } from "@faker-js/faker";
import dayjs from 'dayjs'

export const firstNameField = async function(page) {
  return await page.locator(signUpObjects.firstName())
}
export const lastNameField = async function(page) {
  return await page.locator(signUpObjects.lastName())
}
export const usernameField = async function(page) {
  return await page.locator(signUpObjects.username())
}
export const passwordField = async function(page) {
  return await page.locator(signUpObjects.password())
}
export const confirmPasswordField = async function(page) {
  return await page.locator(signUpObjects.confirmPassword())
}
export const clickSubmitButton = async function(page) {
  return await page.locator(signUpObjects.submitBtn()).click()
}
export const signupAndSubmit = async function(page, userObject: userSignUp) {
  await firstNameField(page).then(locator => locator.fill(userObject.firstName))
  await lastNameField(page).then(locator => locator.fill(userObject.lastName))
  await usernameField(page).then(locator => locator.fill(userObject.username))
  await passwordField(page).then(locator => locator.fill(userObject.password))
  await confirmPasswordField(page).then(locator => locator.fill(userObject.confirmPassword))
  await clickSubmitButton(page)
}
export const generateUserData = async function() {
  const name = faker.person.firstName()
  return await {
    firstName: name, 
    lastName: faker.person.lastName(), 
    username: `${name}${dayjs().format('mmss')}`,
    password: "s3cret",
    confirmPassword: "s3cret"
  }
}


