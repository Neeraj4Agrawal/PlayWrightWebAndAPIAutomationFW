import {test,expect} from '../src/fixtures/pagefixtures';
import {CsvHelper} from '../src/utils/CsvHelper';

test.beforeEach(async ({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.Email,process.env.PASSWORD);

});
/*
let productdata =  CsvHelper.readCsv('src/testdata/productdata.csv');
for (let row of productdata) 
{
    test(`Verify the search results count 5656 - ${row.searchkey}`, async ({homePage,searchResultPage})=>{
       await homePage.doSearch(row.searchkey);
       let searchCount =await searchResultPage.getProductSearchResultsCount();
       console.log("Total search results are : "+ await searchResultPage.getProductSearchResultsCount());
       expect(searchCount).toBe(Number(row.resultcount));
    });
};
*/
test('Verify that user lands on search result page', async ({homePage,searchResultPage,page})=>{
    await homePage.doSearch('Macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    expect.soft(await page.title()).toBe('MacBook Pro');
} )  