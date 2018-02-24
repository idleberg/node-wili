"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
let checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    else {
        return Promise.reject(new Error(response.statusText));
    }
};
let parseJson = (response) => {
    return response.json();
};
let buildUrl = (key, input) => {
    if (Array.isArray(input)) {
        let reqUrl = '';
        input.forEach(r => {
            reqUrl += `&${key}=${r}`;
        });
        return reqUrl;
    }
    return `&${key}=${input}`;
};
let callAPI = (url) => {
    return fetch(url)
        .then(checkStatus)
        .then(parseJson)
        .then(response => {
        return response.data;
    }).catch(error => {
        console.error(error);
    });
};
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
        this.reqUrl += buildUrl('rbl', rbl);
        if (typeof options.activateTrafficInfo !== 'undefined') {
            this.reqUrl += buildUrl('activateTrafficInfo', options.activateTrafficInfo);
        }
        return callAPI(this.reqUrl);
    }
    /**
     * Returns news, elevator maintenance and other information
     * @param {Object} [options] - optional arguments
     * @returns {Object} - JSON
     */
    newsList(options = {}) {
        this.reqUrl = `${this.baseUrl}/newsList?sender=${this.API_KEY}`;
        if (typeof options.relatedLine !== 'undefined') {
            this.reqUrl += buildUrl('relatedLine', options.relatedLine);
        }
        if (typeof options.relatedStop !== 'undefined') {
            this.reqUrl += buildUrl('relatedStop', options.relatedStop);
        }
        if (typeof options.name !== 'undefined') {
            this.reqUrl += buildUrl('name', options.name);
        }
        return callAPI(this.reqUrl);
    }
    /**
     * Returns interruption of operations and elevator outage
     * @param {Object} [options] - optional arguments
     * @returns {Object} - JSON
     */
    trafficInfoList(options = {}) {
        this.reqUrl = `${this.baseUrl}/trafficInfoList?sender=${this.API_KEY}`;
        if (typeof options.relatedLine !== 'undefined') {
            this.reqUrl += buildUrl('relatedLine', options.relatedLine);
        }
        if (typeof options.relatedStop !== 'undefined') {
            this.reqUrl += buildUrl('relatedStop', options.relatedStop);
        }
        if (typeof options.name !== 'undefined') {
            this.reqUrl += buildUrl('name', options.name);
        }
        return callAPI(this.reqUrl);
    }
}
exports.default = WienerLinien;
//# sourceMappingURL=index.js.map