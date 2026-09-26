import { expect, test } from "../../src/fixtures/apifixtures";
import Ajv from "ajv";
import fs from 'fs';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
  Authorization: `Bearer ${TOKEN}`,
};
let ajv = new Ajv();

test("validate schema of user response", async ({ apiHelper }) => {
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
  // 1 - get all users
  let getresponse = await apiHelper.get(
    `/public/v2/users/${response.body.id}`,
    AUTH_HEADER,
  );
  expect(getresponse.status).toBe(200);

  let validate =ajv.compile(JSON.parse(fs.readFileSync('./src/schema/userschema.json','utf-8')));
  let isSchemaValid  =  validate(getresponse.body);
  if(!isSchemaValid)
  {
    console.log('schema errors are '+validate.errors);
  }
  expect(isSchemaValid).toBeTruthy();
});
  