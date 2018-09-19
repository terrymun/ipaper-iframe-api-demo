/** @class */
export default class Logger {

    private _loggerEl: HTMLElement;

    /** @constructor */
    constructor(id: string) {
        this._loggerEl = document.getElementById(id);
    }

    /** @method */
    public add(payload: { [key: string]: any }): void {
        const eventLogEntry = document.createElement('li');
        eventLogEntry.classList.add('event-log__item');
    
        payload.timestamp = new Date();
        eventLogEntry.innerHTML = JSON.stringify(payload);
    
        this._loggerEl.appendChild(eventLogEntry);
        this._loggerEl.scrollTo(0, this._loggerEl.scrollHeight);
    }

    /** @method */
    public clear(): void {
        this._loggerEl.innerHTML = '';
    }
}