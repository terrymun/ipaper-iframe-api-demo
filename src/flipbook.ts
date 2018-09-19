import './flipbook.scss';
import { IPaperIFrameAction, IPaperIFrameEvent } from './typings';

const eventLogEl = document.getElementById('event-log');
window.addEventListener('message', e => {
	if (e.data.action === void 0)
		return;

	const action = e.data.action as IPaperIFrameAction;
	const eventLogEntry = document.createElement('li');
	eventLogEntry.classList.add('event-log__item');

	const data = e.data;
	data.timestamp = new Date();
	eventLogEntry.innerHTML = JSON.stringify(data);

	eventLogEl.appendChild(eventLogEntry);
	eventLogEl.scrollTo(0, eventLogEl.scrollHeight);

	(document.getElementById('clear-log') as HTMLButtonElement).disabled = false;
}, false);

document.addEventListener('DOMContentLoaded', e => {
	window.parent.postMessage(IPaperIFrameEvent.READY, '*');
});

document.getElementById('clear-log').addEventListener('click', e => {
	document.getElementById('event-log').innerHTML = '';
	(e.target as HTMLButtonElement).disabled = true;
});