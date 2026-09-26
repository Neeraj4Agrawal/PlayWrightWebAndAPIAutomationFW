import { ApiHelper } from "../../src/Api/ApiHelper";
import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
  Authorization: `Bearer ${TOKEN}`,
};

let userId;

//describe is a  meothd where we can define the multiple test method and serial mean all described test will run serially.
test.describe.serial("running e2e go cart rest api test", () => {
  // GET TEST
  test("GET API - get all users", async ({ apiHelper }) => {
    let response = await apiHelper.get("/public/v2/users", AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    console.log(response.body);
  });

  // POST  TEST
  test("POST API - Create new user", async ({ apiHelper }) => {
    let jsonData = {
      name: "Manish lalwani",
      email: `pw${Date.now()}@gmail.com`,
      gender: "female",
      status: "InActive",
    };
    let response = await apiHelper.post(
      "/public/v2/users",
      jsonData,
      AUTH_HEADER,
    );
    expect(response.status).toBe(201);
    userId = response.body.id;
    console.log("created user id is " + userId);
  });  
});
