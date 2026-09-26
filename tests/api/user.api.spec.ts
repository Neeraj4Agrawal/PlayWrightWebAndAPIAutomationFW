import { test, request, expect, type APIResponse } from "@playwright/test";
import { time } from "node:console";

let AUTH_TOKEN = {
  Authorization:
    "Bearer 3a1ae525d5de329b3c7e1e74e7ac1c4956ed6c99cf7804cd9712a52b7cb8be10",
};

test("Get all user", async ({ request }) => {
  let response: APIResponse = await request.get(
    "https://gorest.co.in/public/v2/users",
    { headers: AUTH_TOKEN },
  );
  let jsonbody = await response.json();
  console.log(jsonbody);
  console.log(response.status());
  console.log(response.statusText());
});

test("Create user post api call", async ({ request }) => {
  let jsonData = {
    name: "Manish",
    email: `pw${Date.now()}@gmail.com`,
    gender: "female",
    status: "Active",
  };

  let response: APIResponse = await request.post(
    "https://gorest.co.in/public/v2/users",
    { headers: AUTH_TOKEN, data: jsonData },
  );
  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log(response.status());
  console.log(response.statusText());
  expect(response.status()).toBe(201);
});

test("Update user post api call", async ({ request }) => {
  let jsonData_C = {
    name: "Manish",
    email: `pw${Date.now()}@gmail.com`,
    gender: "female",
    status: "Active",
  };

  let response_c: APIResponse = await request.post(
    "https://gorest.co.in/public/v2/users",
    { headers: AUTH_TOKEN, data: jsonData_C },
  );
  let jsonBody_c = await response_c.json();
  let id = jsonBody_c.id;

  console.log("created json response is " + jsonBody_c);
  console.log("create user id is " + id);

  let jsonData = {
    name: "Manish lalwani",
    email: `su02${Date.now()}@gmail.com`,
    gender: "female",
    status: "InActive",
  };

  let response: APIResponse = await request.put(
    `https://gorest.co.in/public/v2/users/${id}`,
    { headers: AUTH_TOKEN, data: jsonData },
  );
  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log(response.status());
  console.log(response.statusText());
  expect(response.status()).toBe(200);
});

test("delete user post api call", async ({ request }) => {
  let jsonData_C = {
    name: "Manish",
    email: `pw${Date.now()}@gmail.com`,
    gender: "female",
    status: "Active",
  };

  let response_c: APIResponse = await request.post(
    "https://gorest.co.in/public/v2/users",
    { headers: AUTH_TOKEN, data: jsonData_C },
  );
  let jsonBody_c = await response_c.json();
  let id = jsonBody_c.id;

  let response: APIResponse = await request.delete(
    `https://gorest.co.in/public/v2/users/${id}`,
    { headers: AUTH_TOKEN },
  );

  console.log(response.status());
  console.log(response.statusText());
  expect(response.status()).toBe(204);
});
