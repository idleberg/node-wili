import * as fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

export default class WienerLinien {
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
  public monitor(rbl: number|string|number[]|string[], options: ActiveTrafficInfo = {}) {
    this.reqUrl = `${this.baseUrl}/monitor?sender=${this.API_KEY}`;
    this.reqUrl += queryString.stringify({rbl: rbl});

    if (typeof options.activateTrafficInfo !== 'undefined' && options.activateTrafficInfo) {
      this.reqUrl += queryString.stringify({activateTrafficInfo: options.activateTrafficInfo});
    }

    return this.callAPI(this.reqUrl);
  }

  /**
   * Returns news, elevator maintenance and other information
   * @param {Object} [options] - optional arguments
   * @returns {Object} - JSON
   */
  public newsList(options: RelatedInfo = {}) {
    this.reqUrl = `${this.baseUrl}/newsList?sender=${this.API_KEY}`;

    if (typeof options.relatedLine !== 'undefined' && options.relatedLine) {
      this.reqUrl += queryString.stringify({relatedLine: options.relatedLine});
    }

    if (typeof options.relatedStop !== 'undefined' && options.relatedStop) {
      this.reqUrl += queryString.stringify({relatedStop: options.relatedStop});
    }

    if (typeof options.name !== 'undefined' && options.name) {
      this.reqUrl += queryString.stringify({name: options.name});
    }

    return this.callAPI(this.reqUrl);
  }

  /**
   * Returns interruption of operations and elevator outage
   * @param {Object} [options] - optional arguments
   * @returns {Object} - JSON
   */
  public trafficInfoList(options: RelatedInfo = {}) {
    this.reqUrl = `${this.baseUrl}/trafficInfoList?sender=${this.API_KEY}`;

    if (typeof options.relatedLine !== 'undefined' && options.relatedLine) {
      this.reqUrl += queryString.stringify({relatedLine: options.relatedLine});
    }

    if (typeof options.relatedStop !== 'undefined' && options.relatedStop) {
      this.reqUrl += queryString.stringify({relatedStop: options.relatedStop});
    }

    if (typeof options.name !== 'undefined' && options.name) {
      this.reqUrl += queryString.stringify({name: options.name});
    }

    return this.callAPI(this.reqUrl);
  }

  private checkStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  };

  private parseJson (response: Response): Promise<Response> {
    return response.json();
  };

  private callAPI(url: string) {
    return fetch(url)
      .then(this.checkStatus)
      .then(this.parseJson)
      .then(response => response.data)
      .catch(console.error);
  };
}
