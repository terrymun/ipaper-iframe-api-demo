/** @enum */
export enum IPaperIFrameAction {
	GO_TO_PAGE = 'goToPage',
	ADD_SHOP_ITEM = 'addShopItem'
}

/** @enum */
export enum IPaperIFrameEvent {
	READY = 'ready',
	AFTER_PAGE_CHANGE = 'afterPageChange',
	AFTER_SHOP_ITEM_ADDED = 'afterShopItemAdded'
}

/** @type */
export type IPaperIFrameAddShopItemData = {
	title: string,
	description: string,
	productId: string,
	price: number,
	originPage: number
}

/** @type */
export type IPaperIFrameGoToPageData = number;

/** @interface */
export interface IPaperIFrameEventData {
	eventName: IPaperIFrameEvent,
	data?: any
}

/** @type */
type IPaperIFrameAddShopItem = {
	action: IPaperIFrameAction.ADD_SHOP_ITEM,
	data: IPaperIFrameAddShopItemData
}

/** @type */
type IPaperIFrameGoToPage = {
	action: IPaperIFrameAction.GO_TO_PAGE,
	data: IPaperIFrameGoToPageData
}

/** @type */
export type IPaperIFrameActionData = IPaperIFrameAddShopItem | IPaperIFrameGoToPage;