import './flipbook.scss';
import Logger from './framework/Logger';
import { IPaperIFrameAction, IPaperIFrameEvent } from './typings';

const logger = new Logger('event-log');

window.addEventListener('message', e => {
	if (e.data.action === void 0)
		return;

	logger.add(e.data);

	(document.getElementById('clear-log') as HTMLButtonElement).disabled = false;
}, false);

document.addEventListener('DOMContentLoaded', e => {
	window.parent.postMessage(IPaperIFrameEvent.READY, '*');
});

document.getElementById('clear-log').addEventListener('click', e => {
	logger.clear();
	(e.target as HTMLButtonElement).disabled = true;
});