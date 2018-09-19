import './demo.scss';
import Logger from './framework/Logger';
import IPaperIFrameAPI from './iPaperIframeApi';

const embeddedIframes = {
	flipbook1: new IPaperIFrameAPI('flipbook1')
} as { [key: string]: IPaperIFrameAPI };

const loggers = {
	flipbook1: new Logger('logger1'),
	flipbook2: new Logger('logger2')
} as { [key: string]: Logger };

embeddedIframes.flipbook1.ready().then(() => {
	loggers.flipbook1.add({ event: 'Embedded flipbook has triggered DOMready' })
});

document.getElementById('instantiate-embedded-flipbook').addEventListener('click', e => {
	embeddedIframes.flipbook2 = new IPaperIFrameAPI('flipbook2', { url: './embedded/flipbook.html' });
	document.getElementById('flipbook2-actions').style.display = 'block';
	embeddedIframes.flipbook2.ready().then(() => {
		loggers.flipbook2.add({ event: 'Embedded flipbook has triggered DOMready' })
	});
	
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

Array.from(document.querySelectorAll('.action--go-to-page')).forEach(goToPageButton => {
	goToPageButton.addEventListener('click', e => {
		const el = e.target as HTMLElement;
		const embeddedIframeId = el.getAttribute('data-target');
		const valueEl = document.querySelector(`.action--go-to-page__value[data-target="${embeddedIframeId}"]`) as HTMLInputElement;
		embeddedIframes[embeddedIframeId].goToPage(+valueEl.value);
	});
});

Array.from(document.querySelectorAll('.action--add-shop-item')).forEach(goToPageButton => {
	goToPageButton.addEventListener('click', e => {
		const el = e.target as HTMLElement;
		const embeddedIframeId = el.getAttribute('data-target');
		const valueEl = document.querySelector(`.action--add-shop-item__value[data-target="${el.getAttribute('data-target')}"]`) as HTMLInputElement;
		embeddedIframes[embeddedIframeId].addShopItem(JSON.parse(valueEl.value));
	});
});