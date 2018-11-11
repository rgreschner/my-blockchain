import { AppState } from "./app-state.model";

// Initial state of blockchain.
export const INITIAL_STATE: AppState = {
	nonce: 0,
	ts: new Date().valueOf()
};
