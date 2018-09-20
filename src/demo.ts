import './demo.scss';
import Logger from './framework/Logger';
import IPaperIFrameAPI from './api/main';
import { IPaperIFrameEvent } from './api/typings';

// Create a hash of all API instances so that our action buttons can access them by ID
const embeddedIframes = {
	flipbook1: new IPaperIFrameAPI('flipbook1')
} as { [key: string]: IPaperIFrameAPI };

// Create a hash of all logger instances
const loggers = {
	flipbook1: new Logger('logger1'),
	flipbook2: new Logger('logger2')
} as { [key: string]: Logger };

/*
 * Example 1: <iframe> already present in DOM and instantiated previously
 * ======================================================================
 * The API uses the ID parameter with no supplied options, e.g.:
 * new IPaperIFrameAPI('flipbook1');
 */
// Bind events
embeddedIframes.flipbook1.ready().then(() => loggers.flipbook1.add({ event: 'Embedded flipbook has triggered DOMready' }));
embeddedIframes.flipbook1.on(IPaperIFrameEvent.AFTER_PAGE_CHANGE, () => loggers.flipbook1.add({ event: IPaperIFrameEvent.AFTER_PAGE_CHANGE }));
embeddedIframes.flipbook1.on(IPaperIFrameEvent.AFTER_SHOP_ITEM_ADDED, () => loggers.flipbook1.add({ event: IPaperIFrameEvent.AFTER_SHOP_ITEM_ADDED }));

/*
 * Example 2: Dynamically create new <iframe> based on supplied ID of a placeholder element and a URL
 * ==================================================================================================
 * The API uses the ID parameter to locate the placeholder element, with the iframe URL specified in the options, e.g.:
 * new IPaperIFrameAPI('flipbook2', { url: /path/to/flipbook });
 */
document.getElementById('instantiate-embedded-flipbook').addEventListener('click', e => {
	embeddedIframes.flipbook2 = new IPaperIFrameAPI('flipbook2', { url: './embedded/flipbook.html' });
	document.getElementById('flipbook2-actions').style.display = 'block';

	// Bind events
	embeddedIframes.flipbook2.ready().then(() => loggers.flipbook2.add({ event: 'Embedded flipbook has triggered DOMready' }));
	embeddedIframes.flipbook2.on(IPaperIFrameEvent.AFTER_PAGE_CHANGE, () => loggers.flipbook2.add({ event: IPaperIFrameEvent.AFTER_PAGE_CHANGE }));
	embeddedIframes.flipbook2.on(IPaperIFrameEvent.AFTER_SHOP_ITEM_ADDED, () => loggers.flipbook2.add({ event: IPaperIFrameEvent.AFTER_SHOP_ITEM_ADDED }));
	
	(e.target as HTMLButtonElement).disabled = true;
	(document.getElementById('destroy-embedded-flipbook') as HTMLButtonElement).disabled = false;
});
document.getElementById('destroy-embedded-flipbook').addEventListener('click', e => {
	const iFramedFlipbook = embeddedIframes.flipbook2.getIFrameElement();
	const placeholderEl = document.createElement('div');
	iFramedFlipbook.parentNode.insertBefore(placeholderEl, iFramedFlipbook.nextSibling);
	
	embeddedIframes.flipbook2.destroy().then(() => {

		loggers.flipbook2.add({ event: 'Embedded flipbook destroyed' });

		placeholderEl.id = 'flipbook2';
		placeholderEl.classList.add('flipbook-placeholder');
		placeholderEl.innerHTML = 'Placeholder';

		(e.target as HTMLButtonElement).disabled = true;
		(document.getElementById('instantiate-embedded-flipbook') as HTMLButtonElement).disabled = false;
	});
});

/*
 * Example code on how the API can be interacted with
 * ==================================================
 * The buttons below simply get the API instance from the hash, and call methods such as `goToPage` or `addShopItem`
 */
// Navigate to a page on the iframed flipbook
Array.from(document.querySelectorAll('.action--go-to-page')).forEach(goToPageButton => {
	goToPageButton.addEventListener('click', e => {
		const el = e.target as HTMLElement;
		const embeddedIframeId = el.getAttribute('data-target');
		const valueEl = document.querySelector(`.action--go-to-page__value[data-target="${embeddedIframeId}"]`) as HTMLInputElement;
		embeddedIframes[embeddedIframeId].goToPage(+valueEl.value);
	});
});

// Add a shop item to the iframed flipbook
Array.from(document.querySelectorAll('.action--add-shop-item')).forEach(addShopItemButton => {
	addShopItemButton.addEventListener('click', e => {
		const el = e.target as HTMLElement;
		const embeddedIframeId = el.getAttribute('data-target');
		const valueEl = document.querySelector(`.action--add-shop-item__value[data-target="${el.getAttribute('data-target')}"]`) as HTMLInputElement;
		embeddedIframes[embeddedIframeId].addShopItem(JSON.parse(valueEl.value));
	});
});