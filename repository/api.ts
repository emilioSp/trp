import { storage } from './storage.ts';

type ApiLinkResponse = {
  link: string;
};

export const fetchData = async (url: string) => {
  const store = storage.getStore();
  if (!store) {
    throw new Error('Storage context not found');
  }
  const { accessToken } = store;
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${accessToken.access_token}`);

  const response = await fetch(url, {
    method: 'GET',
    headers,
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
  }

  const body = (await response.json()) as ApiLinkResponse;

  if (!response.ok) {
    throw new Error(JSON.stringify(body));
  }

  const data = await fetch(body.link).then((response) => response.json());
  return data;
};
