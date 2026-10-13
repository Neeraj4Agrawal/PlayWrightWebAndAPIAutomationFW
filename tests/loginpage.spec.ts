import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { meta } from "reporting-labs";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
});
test.afterEach(async ({ page }) => {
  await page.pause();
});

test("@regression Login page title validation test", async ({ page }) => {
  meta({
    priority: "P2",
    severity: "Cretical",
    owner: "Neeraj",
    story: "CONT-1100",
    epic: "EP1090",
    feature: "Title Validation",
    issue: "DEF-110",
  });
  let pageTitle = await loginPage.getPageTitle();
  console.log("Login page title is : " + pageTitle);
  expect(pageTitle).toBe("Account Login");
});

test("@regression forgot password link exist test", async ({ page }) => {
  meta({
    priority: "P2",
    severity: "Cretical",
    owner: "Neeraj",
    story: "CONT-1100",
    epic: "EP1090",
    feature: "Forgot password",
    issue: "DEF-110",
  });
  expect(await loginPage.isForgottenPasswordLinkExist()).toBeTruthy();
});

test("@regression User is able to login to page", async ({ page }) => {
  meta({
    priority: "P2",
    severity: "Cretical",
    owner: "Neeraj",
    story: "CONT-1100",
    epic: "EP1090",
    feature: "Valid Login",
    issue: "DEF-110",
  });
  await loginPage.doLogin("neeraj.test@test.com", "Neeraj4@");
});
