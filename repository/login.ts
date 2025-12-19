import { writeFileSync } from 'node:fs';

type OAuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export async function performLogin() {
  if (
    !process.env.CLIENT_ID ||
    !process.env.CLIENT_SECRET ||
    !process.env.USER_NAME ||
    !process.env.PASSWORD ||
    !process.env.ACCESS_TOKEN_FILE
  ) {
    throw new Error('Required environment variables are not set');
  }

  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'password_limited',
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    scope: 'iracing.auth',
  });

  const response = await fetch('https://oauth.iracing.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Login failed with status ${response.status}: ${errorText}`,
    );
  }

  const responseJSON = (await response.json()) as OAuthResponse;
  writeFileSync(
    process.env.ACCESS_TOKEN_FILE,
    JSON.stringify(
      {
        ...responseJSON,
        expire_time: Date.now() + responseJSON.expires_in * 1000,
      },
      null,
      2,
    ),
  );
}
