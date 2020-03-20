"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const queryString = require("query-string");
class WienerLinien {
    constructor(API_KEY = process.env.WIENER_LINIEN_API_KEY) {
        this.API_KEY = API_KEY;
    }
    /**
     * Returns real-time data for a station
     * @param {number|string|number[]|string[]} rbl - RBL number
     * @param {Object} [options] - optional arguments
     * @returns {Object} - JSON
     */
    monitor(rbl, options = {}) {
        const urlParams = {
            sender: this.API_KEY,
            rbl: rbl,
        };
        if (typeof options.activateTrafficInfo !== 'undefined' && options.activateTrafficInfo) {
            urlParams['activateTrafficInfo'] = options.activateTrafficInfo;
        }
        // console.trace(urlParams)
        return this.apiCall('/monitor', urlParams);
    }
    /**
     * Returns news, elevator maintenance and other information
     * @param {Object} [options] - optional arguments
     * @returns {Object} - JSON
     */
    newsList(options = {}) {
        const urlParams = {
            sender: this.API_KEY
        };
        if (typeof options.relatedLine !== 'undefined' && options.relatedLine) {
            urlParams['relatedLine'] = options.relatedLine;
        }
        if (typeof options.relatedStop !== 'undefined' && options.relatedStop) {
            urlParams['relatedStop'] = options.relatedStop;
        }
        if (typeof options.name !== 'undefined' && options.name) {
            urlParams['name'] = options.name;
        }
        // console.trace(urlParams)
        return this.apiCall('newsList', urlParams);
    }
    /**
     * Returns interruption of operations and elevator outage
     * @param {Object} [options] - optional arguments
     * @returns {Object} - JSON
     */
    trafficInfoList(options = {}) {
        const urlParams = {
            sender: this.API_KEY
        };
        if (typeof options.relatedLine !== 'undefined' && options.relatedLine) {
            urlParams['relatedLine'] = options.relatedLine;
        }
        if (typeof options.relatedStop !== 'undefined' && options.relatedStop) {
            urlParams['relatedStop'] = options.relatedStop;
        }
        if (typeof options.name !== 'undefined' && options.name) {
            urlParams['name'] = options.name;
        }
        // console.trace(urlParams)
        return this.apiCall('trafficInfoList', urlParams);
    }
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }
    parseJson(response) {
        return response.json();
    }
    apiCall(urlPath, urlParams) {
        const url = new URL('https://www.wienerlinien.at/ogd_realtime/');
        url.pathname += urlPath;
        url.search = queryString.stringify(urlParams);
        return fetch(url.href)
            .then(this.checkStatus)
            .then(this.parseJson)
            .then(response => response.data)
            .catch(console.error);
    }
}
exports.default = WienerLinien;
//# sourceMappingURL=index.js.map