import { test, expect } from "@playwright/test";

let OUTH_CONFIG = {
  tokenURL: "https://accounts.spotify.com/api/token",
  clientId: process.env.OUTH_CLINET_ID,
  clientSecret: process.env.OUTH_CLIENT_SECRET,
  grantType: process.env.OUTH_GRANT_TYPE!,
};

let accessToken: string;

test.beforeEach("POST-Generate the access Token", async ({ request }) => {
  let response = await request.post(OUTH_CONFIG.tokenURL, {
    form: {
      client_id: OUTH_CONFIG.clientId,
      client_secret: OUTH_CONFIG.clientSecret,
      grant_type: OUTH_CONFIG.grantType!,
    },
  });
  expect(response.status()).toBe(200);
  let jsonResponse = await response.json();
  console.log("json is " + jsonResponse);
  accessToken = jsonResponse.access_token;
  console.log("Access token is " + accessToken);
});

test("Get the album api using outh token", async ({ request }) => {
  //curl --request GET \
  /*
  --url https://api-partner.spotify.com/ads/v3/ad_accounts/ce4ff15e-f04d-48b9-9ddf-fb3c85fbd57a \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

  */
  let base_url = "https://api.spotify.com";
  let endpoint = "/v1/albums/4aawyAB9vmqN3uQ7FjRGTy";

  let albumResponse = await request.get(`${base_url}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  console.log("albumresponse is  ==========" + (await albumResponse.body()));
  expect(albumResponse.status()).toBe(200);
});
