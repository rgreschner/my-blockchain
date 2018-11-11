import * as lotion from "lotion";
import { Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { AppState } from "./app-state.model";
import { INITIAL_STATE } from "./initial-state.const";
import { logger } from "./logger.const";

// Compare two states for equality judging
// by their nonce values.
const compareAppStates = function compareAppStates(a: AppState, b: AppState) {
	return a.nonce == b.nonce;
};

const main = async function main() {
	try {
		// Create stream for state update
		// notifications.
		const stateUpdatedSource = new Subject<AppState>();
		const stateUpdated$ = stateUpdatedSource
			.asObservable()
			.pipe(distinctUntilChanged(compareAppStates));
		// Log state updates on stream.
		stateUpdated$.subscribe(state => logger.info("Updated state: ", state));
		// Initiate & start app.
		const initialState = { ...INITIAL_STATE };
		const app = lotion({ initialState });
		app.use((state: AppState, tx: any) => {
			if (state.nonce == tx.nonce && state.ts < tx.ts) {
				// Update state from tx.
				state.nonce++;
				state.ts = tx.ts;
				// Emit updated event.
				stateUpdatedSource.next(state);
			}
		});
		const startInfo = await app.start();
		// Log startup info.
		const gci = startInfo.GCI;
		const rpc = startInfo.ports.rpc;
		logger.info({ gci }, `Uses GCI: ${gci}`);
		logger.info({ rpc }, `Uses RPC Port: ${rpc}`);
	} catch (err) {
		logger.error({ err }, `Error starting my blockchain :'(`);
	}
};

main();
