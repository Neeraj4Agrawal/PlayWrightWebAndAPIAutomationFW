import { test, expect } from "../src/fixtures/pagefixtures";
import { CsvHelper } from "../src/utils/CsvHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/JsonHelper";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
});

// test.afterEach(async ({page})=>{
//     await page.pause();
// });

test("Login page title validation ", async ({ loginPage }) => {
  await allure.suite("Login Suite");
  await allure.severity("High");
  await allure.feature("Authentication");
  await allure.story("Valid Login");
  await allure.description("Verify login page title page validation");

  let pageTitle = await loginPage.getPageTitle();
  console.log("Login page title is : " + pageTitle);
  expect(pageTitle).toBe("Account Login");
});

test("forgot password link exist test", async ({ loginPage }) => {
  await allure.suite("Login Suite");
  await allure.severity("High");
  await allure.feature("Forgot Password");
  await allure.story("Valid Login");
  await allure.description("forgot password link exist test");

  await allure.step("check if forgotton password link exsit", async () => {
    expect(await loginPage.isForgottenPasswordLinkExist()).toBeTruthy();
  });
});

test("Verify User is able to login to page", async ({
  loginPage,
  homePage,
}) => {
  await allure.suite("Login Suite");
  await allure.severity("High");
  await allure.feature("Login check ");
  await allure.story("Valid Login");
  await allure.description("Verify User is able to login to page");

  await loginPage.doLogin(process.env.Email, process.env.PASSWORD);
});

// dd appraoch using csv
let testdata = CsvHelper.readCsv("src/testdata/logindata.csv");
for (let row of testdata) {
  test(`Login to App with Invalid credential using CSV Data reader - ${row.username}`, async ({
    loginPage,
    homePage,
  }) => {
    await allure.suite("Login Suite");
    await allure.severity("High");
    await allure.feature("Login-CSV Data reader");
    await allure.story("Valid Login");
    await allure.description(
      "Login to App with Invalid credential using CSV Data reader",
    );
    await loginPage.doLogin(row.username, row.password);
    expect(loginPage.getLoginErrorMessage()).toBeTruthy();
  });
}

// dd appraoch using excel
/*
let testExcelData =  ExcelHelper.readExcel('src/testdata/opencartdata.xlsx','login');
for (let row of testExcelData)
{
    test(`Login to App with Invalid credential with excel data - ${row.username}`, async ({ loginPage,homePage }) => {
        await loginPage.doLogin(row.username,row.password);
        expect(loginPage.getLoginErrorMessage()).toBeTruthy();
  }); 
};
*/

// dd appraoch using json
let testJsonData = JsonHelper.readJson("src/testdata/logindata.json");
for (let row of testJsonData) {
  test(`Login to App with Invalid credential with json data - ${row.username}`, async ({
    loginPage,
    homePage,
  }) => {
    await allure.suite("Login Suite");
    await allure.severity("High");
    await allure.feature("Login check JSON Reader ");
    await allure.story("Valid Login");
    await allure.description(
      "ogin to App with Invalid credential with json data ",
    );
    await loginPage.doLogin(row.username, row.password);
    expect(loginPage.getLoginErrorMessage()).toBeTruthy();
  });
}

// common fratures test of pages
test("App logo visibility on login page", async ({ basePage }) => {
  await basePage.isLogoVsisble();
});

test("Search box visibility on login page", async ({ basePage }) => {
  await basePage.isSearchBoxVisible();
});

test("cart visibility on login page", async ({ basePage }) => {
  await basePage.isCartButtonVisible();
});

test("Footers exist on login page", async ({ basePage }) => {
  expect(await basePage.getPageFooterCount()).toBe(16);
});
