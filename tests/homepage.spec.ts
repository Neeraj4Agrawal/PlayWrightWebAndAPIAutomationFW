import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";
import { test, expect } from "../src/fixtures/pagefixtures";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.doLogin("neeraj.test@test.com", "Neeraj4@");
  homePage = new HomePage(page);
});

test("Home page title valiation test ", async () => {
  let title = await homePage.getHomePageTitle();
  console.log("title of home page is " + title);
  expect(title).toBe("My Account");
});

test("Logout lnik exist test", async () => {
  expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test("Homre page header validation test", async () => {
  let headers = await homePage.getHomePageHeaders();
  console.log("Headr value are " + headers);
  expect.soft(headers.length).toBe(4);
  expect
    .soft(headers)
    .toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]);
});

// common fratures test of pages
test(" @smoke App logo visibility on login page", async ({ basePage }) => {
  await basePage.isLogoVsisble();
});

test(" @smoke Search box visibility on login page", async ({ basePage }) => {
  await basePage.isSearchBoxVisible();
});

test("@smoke cart visibility on login page", async ({ basePage }) => {
  await basePage.isCartButtonVisible();
});

test("@smoke Footers exist on login page", async ({ basePage }) => {
  expect(await basePage.getPageFooterCount()).toBe(16);
});
