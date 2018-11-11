import { connect } from "lotion";
import { timer } from "rxjs";
import { AppState } from "./app-state.model";
import { logger } from "./logger.const";
import { MESSAGE_INVALID_GCI } from "./messages.const";

// Periodic send tx interval.
const TRANSACTION_INTERVAL = 5000;

const main = async function main(argv: string[]) {
	const gci: string = argv[2];
	if (!gci) {
		// Supplied GCI was invalid!
		logger.error(MESSAGE_INVALID_GCI);
		setTimeout(() => process.exit(-1), 1000);
		return;
	}
	// Log GCI just to make sure.
	logger.info({ gci }, `Uses GCI: ${gci}`);
	const { state, send } = await connect(gci);
	timer(0, TRANSACTION_INTERVAL).subscribe(async () => {
		const prevState: AppState = {
			nonce: await state.nonce,
			ts: await state.ts
		};
		logger.info({ prevState }, "Previous state.");
		const nonce = prevState.nonce;
		// Set new timestamp here.
		const ts = new Date().valueOf();
		logger.info({ nonce }, `Sending tx with nonce ${nonce}`);
		const sendResult = await send({ nonce, ts });
		logger.info(sendResult, `Got send result.`);
	});
};

main(process.argv);
