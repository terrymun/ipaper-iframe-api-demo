import './flipbook.scss';
import Logger from './framework/Logger';
import {
	// Actions
	IPaperIFrameAction,
	IPaperIFrameActionData,

	// Events
	IPaperIFrameEvent,
	IPaperIFrameEventData,
	
	// Specific event data
	IPaperIFrameAddShopItemData,
	IPaperIFrameGoToPageData
} from './api/typings';

const logger = new Logger('event-log');

// Dummy flipbook states
const shopBasket = [] as IPaperIFrameAddShopItemData[];
let currentPageNumber = 1;

function emitEvent(eventData: IPaperIFrameEventData): void {
	window.parent.postMessage(eventData, '*');
}

window.addEventListener('message', e => {
	if (e.data.action === void 0)
		return;
	
	const apiAction = e.data.action as IPaperIFrameAction;
	const apiPayload = e.data.data as IPaperIFrameActionData;
	switch(apiAction) {
		case IPaperIFrameAction.ADD_SHOP_ITEM:
			shopBasket.push(apiPayload as any as IPaperIFrameAddShopItemData);
			emitEvent({
				eventName: IPaperIFrameEvent.AFTER_SHOP_ITEM_ADDED,
				data: {
					basketItemCount: shopBasket.length,
					basketValue: shopBasket.reduce((accumulator, current) => accumulator + +current.price, 0).toFixed(2)
				}
			});
			break;

		// Here we simulate a delay
		case IPaperIFrameAction.GO_TO_PAGE:
			window.setTimeout(() => {
				currentPageNumber = apiPayload as any as IPaperIFrameGoToPageData;
				emitEvent({
					eventName: IPaperIFrameEvent.AFTER_PAGE_CHANGE,
					data: {
						currentPageNumber
					}
				});
			}, 1000);
			break;
	}

	logger.add(e.data);
}, false);

document.addEventListener('DOMContentLoaded', e => emitEvent({ eventName: IPaperIFrameEvent.READY }));
document.getElementById('clear-log').addEventListener('click', e => logger.clear());