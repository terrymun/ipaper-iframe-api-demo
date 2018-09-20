import './flipbook.scss';
import Logger from './framework/Logger';
import { IPaperIFrameAction, IPaperIFrameEvent } from './api/typings';

const logger = new Logger('event-log');

window.addEventListener('message', e => {
	if (e.data.action === void 0)
		return;

	logger.add(e.data);
}, false);

document.addEventListener('DOMContentLoaded', e => {
	window.parent.postMessage(IPaperIFrameEvent.READY, '*');
});

document.getElementById('clear-log').addEventListener('click', e => {
	logger.clear();
});