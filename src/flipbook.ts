import './flipbook.scss';
import Logger from './framework/Logger';
import { IPaperIFrameAction, IPaperIFrameEvent, IPaperIFrameActionData } from './api/typings';

const logger = new Logger('event-log');

function emitEvent(eventName: string): void {
	window.parent.postMessage(eventName, '*');
}

window.addEventListener('message', e => {
	if (e.data.action === void 0)
		return;
	
	const apiAction = e.data.action as IPaperIFrameAction;
	switch(apiAction) {
		case IPaperIFrameAction.ADD_SHOP_ITEM:
			emitEvent(IPaperIFrameEvent.AFTER_SHOP_ITEM_ADDED);
			break;

		// Here we simulate a delay
		case IPaperIFrameAction.GO_TO_PAGE:
			window.setTimeout(() => emitEvent(IPaperIFrameEvent.AFTER_PAGE_CHANGE), 1000);
			break;
	}

	logger.add(e.data);
}, false);

document.addEventListener('DOMContentLoaded', e => emitEvent(IPaperIFrameEvent.READY));
document.getElementById('clear-log').addEventListener('click', e => logger.clear());