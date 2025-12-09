import { AsyncLocalStorage } from "node:async_hooks";

type StorageContext = {
	accessToken: {
		access_token: string;
		token_type: string;
		expire_time: number;
	};
};

export const storage = new AsyncLocalStorage<StorageContext>();
