import { IPaperIFrameAction, IPaperIFrameEvent } from './typings';

/** @interface */
export interface IIPaperIFrameApiOptions {
    url?: string
}

/** @class */
export default class IPaperIFrameAPI {

    private _iFramedFlipbook: HTMLIFrameElement;

    /** @constructor */
    constructor(selectorOrElement: string | HTMLIFrameElement, options?: IIPaperIFrameApiOptions) {
        if (options !== void 0 && options.url)
            this._injectIFramedFlipbook(selectorOrElement, options.url);
        else if (typeof selectorOrElement === 'string')
            this._iFramedFlipbook = document.getElementById(selectorOrElement) as HTMLIFrameElement;
        else if (selectorOrElement.nodeType === Node.ELEMENT_NODE && selectorOrElement.tagName.toLowerCase() === 'iframe')
            this._iFramedFlipbook = selectorOrElement;

        window.addEventListener('message', this._onMessage, false);
    }

    /** @method */
    public getIFrameElement(): HTMLIFrameElement {
        return this._iFramedFlipbook;
    }

    /** @method */
    public on(eventName: string, callback: (...args: any[]) => void): void {
        
    }

    /** @method */
    public goToPage(pageNumber: number): void {
        this._postMessage({
            action: IPaperIFrameAction.GO_TO_PAGE,
            data: pageNumber
        });
    }

    public addShopItem(shopItem: any): void {
        this._postMessage({
            action: IPaperIFrameAction.ADD_SHOP_ITEM,
            data: shopItem
        });
    }

    /** @method */
    private _postMessage(payload: any): void {
        this._iFramedFlipbook.contentWindow.postMessage(payload, '*');
    }

    /** @method */
    private _injectIFramedFlipbook(selectorOrElement: string | HTMLIFrameElement, url: string): void {
        let iFramedFlipbook: HTMLIFrameElement;
        if (typeof selectorOrElement === 'string') {
            iFramedFlipbook = document.createElement('iframe');
            iFramedFlipbook.src = url;
            iFramedFlipbook.classList.add('embedded-flipbook');
            const originalEl = document.getElementById(selectorOrElement);
            originalEl.parentNode.insertBefore(iFramedFlipbook, originalEl.nextSibling);
            originalEl.remove();
        } else if (selectorOrElement.nodeType === Node.ELEMENT_NODE && selectorOrElement.tagName.toLowerCase() === 'iframe') {
            iFramedFlipbook = selectorOrElement;
            iFramedFlipbook.src = url;
        }

        this._iFramedFlipbook = iFramedFlipbook;
    }

    private _onMessage(e: any) {
        if (e.data === IPaperIFrameEvent.READY) {
            console.log(e);
        }
    }
}