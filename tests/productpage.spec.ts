import { test, expect } from "../src/fixtures/pagefixtures";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.Email, process.env.PASSWORD);
});

test("Verify the product page title test", async ({
  homePage,
  searchResultPage,
  productInfoPage,
  page,
}) => {
  await homePage.doSearch("Macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  let productHeader = await productInfoPage.getProductHeader();
  console.log("Product header is : " + productHeader);
  expect(productHeader).toBe("MacBook Pro");
});

test("Verify the product image count", async ({
  homePage,
  searchResultPage,
  productInfoPage,
  page,
}) => {
  await homePage.doSearch("Macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  let imageCount = await productInfoPage.getProductImagesCount();
  console.log("Product header is : " + imageCount);
  expect.soft(imageCount).toBe(4);
  await page.pause();
});

test("Verify the product Information", async ({
  homePage,
  searchResultPage,
  productInfoPage,
  page,
}) => {
  await homePage.doSearch("Macbook");
  await searchResultPage.selectProduct("MacBook Pro");
  let actualproductInfoMap = await productInfoPage.getprodcutInfo();
  console.log("Actual product info map is : " + actualproductInfoMap);
  expect(actualproductInfoMap.get("Brand")).toBe("Apple");
  expect(actualproductInfoMap.get("Product Code")).toBe("Product 18");
  expect(actualproductInfoMap.get("Reward Points")).toBe("800");
  expect(actualproductInfoMap.get("Availability")).toBe("Out Of Stock");
  expect(actualproductInfoMap.get("productPrice")).toBe("$2,000.00");
  expect(actualproductInfoMap.get("exTaxPrice")).toBe("$2,000.00");
  expect(actualproductInfoMap.get("ProductHeader")).toBe("MacBook Pro");
  expect(actualproductInfoMap.get("ProductImagesCount")).toBe(4);
});

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
