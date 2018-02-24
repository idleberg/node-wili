import * as fetch from 'isomorphic-fetch';

let checkStatus = (response: Response): Promise<Response> => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

let parseJson = (response: Response): Promise<Response> => {
  return response.json();
};

let buildUrl = (key: string, input: Object): string => {
  if (Array.isArray(input)) {
    let reqUrl = '';

    input.forEach( r => {
      reqUrl += `&${key}=${r}`;
    });

    return reqUrl;
  }

  return `&${key}=${input}`;
};

let callAPI = (url: string) => {
  return fetch(url)
  .then(checkStatus)
  .then(parseJson)
  .then( response => {
    return response.data;
  }).catch( error => {
    console.error(error);
  });
};

export class WienerLinien {
  API_KEY: string;
  baseUrl: string;
  reqUrl: string;

  constructor(API_KEY: string = process.env.WIENER_LINIEN_API_KEY) {
    this.API_KEY = API_KEY;
    this.baseUrl = 'https://www.wienerlinien.at/ogd_realtime';
  }

  /**
   * Returns real-time data for a station
   * @param {number|string|number[]|string[]} rbl - RBL number
   * @param {Object} [options] - optional arguments
   * @returns {Object} - JSON
   */
  monitor(rbl: number|string|number[]|string[], options: ActiveTrafficInfo) {
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
  newsList(options: NewsList) {
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
  trafficInfoList(options: TrafficInfo) {
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
