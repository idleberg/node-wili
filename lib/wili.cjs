'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fetch = require('isomorphic-fetch');
var queryString = require('query-string');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var queryString__default = /*#__PURE__*/_interopDefaultLegacy(queryString);

var WienerLinien = /** @class */ (function () {
    function WienerLinien(API_KEY) {
        if (API_KEY === void 0) { API_KEY = undefined; }
        this.API_KEY = (API_KEY && API_KEY.length)
            ? String(API_KEY)
            : String(process.env.WIENER_LINIEN_API_KEY) || 'undefined';
    }
    /**
     * Returns real-time data for a station
     * @param rbl - RBL number
     * @param options optional arguments
     * @returns - JSON
     */
    WienerLinien.prototype.monitor = function (rbl, options) {
        if (options === void 0) { options = {}; }
        var urlParams = {
            rbl: rbl
        };
        if (typeof options.activateTrafficInfo !== 'undefined' && options.activateTrafficInfo) {
            urlParams['activateTrafficInfo'] = options.activateTrafficInfo;
        }
        if (this.API_KEY && this.API_KEY.trim().length) {
            urlParams['sender'] = this.API_KEY;
        }
        return this.apiCall('/monitor', urlParams);
    };
    /**
     * Returns news, elevator maintenance and other information
     * @param options optional arguments
     * @returns JSON
     */
    WienerLinien.prototype.newsList = function (options) {
        if (options === void 0) { options = {}; }
        var urlParams = {};
        if (typeof options.relatedLine !== 'undefined' && options.relatedLine) {
            urlParams['relatedLine'] = options.relatedLine;
        }
        if (typeof options.relatedStop !== 'undefined' && options.relatedStop) {
            urlParams['relatedStop'] = options.relatedStop;
        }
        if (typeof options.name !== 'undefined' && options.name) {
            urlParams['name'] = options.name;
        }
        if (this.API_KEY && this.API_KEY.trim().length) {
            urlParams['sender'] = this.API_KEY;
        }
        return this.apiCall('newsList', urlParams);
    };
    /**
     * Returns interruption of operations and elevator outage
     * @param options optional arguments
     * @returns JSON
     */
    WienerLinien.prototype.trafficInfoList = function (options) {
        if (options === void 0) { options = {}; }
        var urlParams = {};
        if (typeof options.relatedLine !== 'undefined' && options.relatedLine) {
            urlParams['relatedLine'] = options.relatedLine;
        }
        if (typeof options.relatedStop !== 'undefined' && options.relatedStop) {
            urlParams['relatedStop'] = options.relatedStop;
        }
        if (typeof options.name !== 'undefined' && options.name) {
            urlParams['name'] = options.name;
        }
        if (this.API_KEY && this.API_KEY.trim().length) {
            urlParams['sender'] = this.API_KEY;
        }
        return this.apiCall('trafficInfoList', urlParams);
    };
    WienerLinien.prototype.checkStatus = function (response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    };
    WienerLinien.prototype.parseJson = function (response) {
        return response.json();
    };
    WienerLinien.prototype.apiCall = function (urlPath, urlParams) {
        var url = new URL('https://www.wienerlinien.at');
        url.pathname = "/ogd_realtime/" + urlPath;
        url.search = queryString__default['default'].stringify(urlParams);
        return fetch__default['default'](url.href)
            .then(this.checkStatus)
            .then(this.parseJson)
            .then(function (response) { return response.data; })["catch"](console.error);
    };
    return WienerLinien;
}());

exports.WienerLinien = WienerLinien;
