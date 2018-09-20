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
export type IPaperIFrameApiAddShopItemPayload = {
	title: string,
	description: string,
	productId: string,
	price: number,
	originPage: number
}

/** @type */
export type IPaperIFrameApiGoToPagePayload = number;

/** @interface */
export interface IPaperIFrameActionData {
	action: IPaperIFrameAction,
	data: IPaperIFrameApiAddShopItemPayload | IPaperIFrameApiGoToPagePayload
}