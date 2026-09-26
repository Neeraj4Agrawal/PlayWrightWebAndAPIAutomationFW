import {test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import {BasePage} from '../pages/BasePage';
import { SearchResultPage } from '../pages/SearchResultPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';

type pageFixtures ={
    basePage: BasePage;
    loginPage: LoginPage;
    homePage: HomePage;
    searchResultPage: SearchResultPage;
    productInfoPage: ProductInfoPage;
}

export let test = baseTest.extend<pageFixtures>({
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    searchResultPage: async ({ page }, use) => {
        await use(new SearchResultPage(page));
    },
    productInfoPage: async ({ page }, use) => {
        await use(new ProductInfoPage(page));
    }
});

export { expect } from '@playwright/test';   