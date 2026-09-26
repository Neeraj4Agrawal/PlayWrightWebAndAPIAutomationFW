import { test, expect } from "@playwright/test";

let tokenID: string;

test.beforeEach("Basic Auth token Generation ", async ({ request }) => {
  let creds = {
    username: "admin",
    password: "password123",
  };

  let authResponse = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      headers: { "content-Type": "application/json" },
      data: creds,
    },
  );

  expect(authResponse.status()).toBe(200);
  let jsonResponse = await authResponse.json();
  console.log("json response of api is " + jsonResponse);
  tokenID = jsonResponse.token;
  console.log("tokenID of api is " + tokenID);
});

test("create and update booking", async({ request }) => {
  let response  = await request.post("https://restful-booker.herokuapp.com/booking", {
    headers: { "Content-Type": "application/json" },
    data: {
      "firstname": "Jim",
      "lastname": "Brown",
      "totalprice": 111,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01",
      },
      "additionalneeds": "Breakfast",
    },
  });
  expect(response.status()).toBe(200);
  let jsonResponse  =  await response.json();
  let bookingID =  jsonResponse.bookingid;
  console.log('bokking is is '+bookingID);

  let updateResponse  = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {
    headers: { "Cookie": `token=${tokenID}`},
    data: {
      "firstname": "Jima",
      "lastname": "Brown",
      "totalprice": 111,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01",
      },
      "additionalneeds": "Breakfast",
    },
  });
  expect(updateResponse.status()).toBe(200);
  let jsonResponse2  =  await updateResponse.json();
  let first_name =   jsonResponse2.firstname;
  expect(first_name).toBe('Jima');
});
