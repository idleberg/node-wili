"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const queryString = require("query-string");
class WienerLinien {
    constructor(API_KEY = process.env.WIENER_LINIEN_API_KEY) {
        this.API_KEY = API_KEY;
        this.baseUrl = 'https://www.wienerlinien.at/ogd_realtime';
    }
    /**
     * Returns real-time data for a station
     * @param {number|string|number[]|string[]} rbl - RBL number
     * @param {Object} [options] - optional arguments
     * @returns {Object} - JSON
     */
    monitor(rbl, options = {}) {
        this.reqUrl = `${this.baseUrl}/monitor?sender=${this.API_KEY}`;
        this.reqUrl += queryString.stringify({ rbl: rbl });
        if (typeof options.activateTrafficInfo !== 'undefined' && options.activateTrafficInfo) {
            this.reqUrl += queryString.stringify({ activateTrafficInfo: options.activateTrafficInfo });
        }
        return this.callAPI(this.reqUrl);
    }
    /**
     * Returns news, elevator maintenance and other information
     * @param {Object} [options] - optional arguments
     * @returns {Object} - JSON
     */
    newsList(options = {}) {
        this.reqUrl = `${this.baseUrl}/newsList?sender=${this.API_KEY}`;
        if (typeof options.relatedLine !== 'undefined' && options.relatedLine) {
            this.reqUrl += queryString.stringify({ relatedLine: options.relatedLine });
        }
        if (typeof options.relatedStop !== 'undefined' && options.relatedStop) {
            this.reqUrl += queryString.stringify({ relatedStop: options.relatedStop });
        }
        if (typeof options.name !== 'undefined' && options.name) {
            this.reqUrl += queryString.stringify({ name: options.name });
        }
        return this.callAPI(this.reqUrl);
    }
    /**
     * Returns interruption of operations and elevator outage
     * @param {Object} [options] - optional arguments
     * @returns {Object} - JSON
     */
    trafficInfoList(options = {}) {
        this.reqUrl = `${this.baseUrl}/trafficInfoList?sender=${this.API_KEY}`;
        if (typeof options.relatedLine !== 'undefined' && options.relatedLine) {
            this.reqUrl += queryString.stringify({ relatedLine: options.relatedLine });
        }
        if (typeof options.relatedStop !== 'undefined' && options.relatedStop) {
            this.reqUrl += queryString.stringify({ relatedStop: options.relatedStop });
        }
        if (typeof options.name !== 'undefined' && options.name) {
            this.reqUrl += queryString.stringify({ name: options.name });
        }
        return this.callAPI(this.reqUrl);
    }
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }
    ;
    parseJson(response) {
        return response.json();
    }
    ;
    callAPI(url) {
        return fetch(url)
            .then(this.checkStatus)
            .then(this.parseJson)
            .then(response => response.data)
            .catch(console.error);
    }
    ;
}
exports.default = WienerLinien;
//# sourceMappingURL=index.js.map