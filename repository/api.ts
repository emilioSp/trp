import { storage } from './storage.ts';

type ApiLinkResponse = {
  link: string;
};

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 2_000;
const RETRYABLE_STATUS_CODES = new Set([429, 502, 503, 504]);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (
  url: string,
  options?: RequestInit,
): Promise<Response> => {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      const delay = INITIAL_DELAY_MS * 2 ** (attempt - 1);
      console.log(`Retry ${attempt}/${MAX_RETRIES} for ${url} in ${delay}ms`);
      await sleep(delay);
    }

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return response;
      }

      if (!RETRYABLE_STATUS_CODES.has(response.status)) {
        throw new Error(
          `Failed to fetch data from ${url}: ${response.status} ${response.statusText}`,
        );
      }

      lastError = new Error(
        `Failed to fetch data from ${url}: ${response.status} ${response.statusText}`,
      );
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Do not retry non-network, non-retryable errors
      if (lastError.message.startsWith('Failed to fetch data from')) {
        throw lastError;
      }
    }
  }

  throw lastError;
};

export const fetchData = async (url: string) => {
  const store = storage.getStore();
  if (!store) {
    throw new Error('Storage context not found');
  }
  const { accessToken } = store;
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${accessToken.access_token}`);

  const response = await fetchWithRetry(url, {
    method: 'GET',
    headers,
    redirect: 'follow',
  });

  const body = (await response.json()) as ApiLinkResponse;

  const data = await fetchWithRetry(body.link).then((res) => res.json());
  return data;
};
