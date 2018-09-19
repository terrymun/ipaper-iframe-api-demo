import { IPaperIFrameAction, IPaperIFrameEvent } from './typings';

/** @interface */
export interface IIPaperIFrameApiOptions {
    url?: string
}

/** @class */
export default class IPaperIFrameAPI {

    private _iFramedFlipbook: HTMLIFrameElement;
    private _readyPromise: Promise<any>;

    /** @constructor */
    constructor(selectorOrElement: string | HTMLIFrameElement, options?: IIPaperIFrameApiOptions) {
        if (options !== void 0 && options.url)
            this._injectIFramedFlipbook(selectorOrElement, options.url);
        else if (typeof selectorOrElement === 'string')
            this._iFramedFlipbook = document.getElementById(selectorOrElement) as HTMLIFrameElement;
        else if (selectorOrElement.nodeType === Node.ELEMENT_NODE && selectorOrElement.tagName.toLowerCase() === 'iframe')
            this._iFramedFlipbook = selectorOrElement;

        this._readyPromise = new Promise(resolve => {
            window.addEventListener('message', (e: any) => {
                if (e.data === IPaperIFrameEvent.READY)
                    resolve();
            }, false);
        })
    }

    /** @method */
    public ready(): Promise<any> {
        return this._readyPromise;
    }

    /** @method */
    public destroy(): Promise<void> {
        return new Promise(resolve => {
            this.getIFrameElement().remove();
            resolve();
        });
    }

    /** @method */
    public getIFrameElement(): HTMLIFrameElement {
        return this._iFramedFlipbook;
    }

    /** @method */
    public goToPage(pageNumber: number): void {
        this._postMessage({
            action: IPaperIFrameAction.GO_TO_PAGE,
            data: pageNumber
        });
    }

    /** @method */
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
}