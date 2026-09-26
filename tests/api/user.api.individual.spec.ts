import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
  Authorization: `Bearer ${TOKEN}`,
};

async function createUser(apiHelper: any) {
  let jsonData = {
    name: "Manish lalwani",
    email: `su02${Date.now()}@gmail.com`,
    gender: "female",
    status: "InActive",
  };
  let response = await apiHelper.post(
    "/public/v2/users",
    jsonData,
    AUTH_HEADER,
  );
  expect(response.status).toBe(201);
  return response.body;
}

// Test 1 : Create a User test + AAA
// POST -> userID  -> GET/UserID -> Verfiy
test("Create a user test ", async ({ apiHelper }) => {
  // 1- Create an User
  let userResponse = await createUser(apiHelper);
  // 2 - Get User
  let response = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(response.status).toBe(200);
  expect(response.body.name).toBe("Manish lalwani");
});

// Test 2 : Update a User test + verify: AAA
// POST -> userID  -> GET/UserID -> Verfiy
test("update a user test ", async ({ apiHelper }) => {
  //1- Create an User
  let userResponse = await createUser(apiHelper);
  // 2-  Get user
  let response = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(response.status).toBe(200);
  expect(response.body.name).toBe("Manish lalwani");
  // 3- Update a USER
  let updateJsonData = {
    name: "Manish",
    email: `su02${Date.now()}@gmail.com`,
    gender: "female",
    status: "InActive",
  };
  let updatedResponse = await apiHelper.put(
    `/public/v2/users/${userResponse.id}`,
    updateJsonData,
    AUTH_HEADER,
  );
  expect(updatedResponse.status).toBe(200);
  // get a user
  let response1 = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(response1.status).toBe(200);
  expect(response1.body.name).toBe("Manish");
});




// Test 3 : delete a User test + verify: AAA
// POST -> userID  -> GET/UserID -> Verfiy
test("update a user test 2 ", async ({ apiHelper }) => {
  //1- Create an User
  let userResponse = await createUser(apiHelper);
  // 2-  Get user
  let response = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(response.status).toBe(200);
  expect(response.body.name).toBe("Manish lalwani");
  // 3- delete a USER
  let updatedResponse = await apiHelper.delete(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(updatedResponse.status).toBe(204);
  // get a user
  let response1 = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(response1.status).toBe(404);
});