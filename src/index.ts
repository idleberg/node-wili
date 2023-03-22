import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

class WienerLinien {
  /**
   * Returns real-time data for a station
   * @param rbl - RBL number
   * @param options optional arguments
   * @returns - JSON
   */
  public monitor(rbl: number | string | number[] | string[], options: MonitorOptions = {}) {
    const urlParams: MonitorParams = {
      rbl: rbl,
    };

    if (typeof options.activateTrafficInfo !== 'undefined' && options.activateTrafficInfo) {
      urlParams['activateTrafficInfo'] = options.activateTrafficInfo;
    }

    return this.apiCall('/monitor', urlParams);
  }

  /**
   * Returns news, elevator maintenance and other information
   * @param options optional arguments
   * @returns JSON
   */
  public newsList(options: NewsListOptions = {}) {
    const urlParams: NewsListParams = {};

    if (typeof options.relatedLine !== 'undefined' && options.relatedLine) {
      urlParams['relatedLine'] = options.relatedLine;
    }

    if (typeof options.relatedStop !== 'undefined' && options.relatedStop) {
      urlParams['relatedStop'] = options.relatedStop;
    }

    if (typeof options.name !== 'undefined' && options.name) {
      urlParams['name'] = options.name;
    }

    return this.apiCall('newsList', urlParams);
  }

  /**
   * Returns interruption of operations and elevator outage
   * @param options optional arguments
   * @returns JSON
   */
  public trafficInfoList(options: TrafficInfoOptions = {}) {
    const urlParams: TrafficInfoParams = {};

    if (typeof options.relatedLine !== 'undefined' && options.relatedLine) {
      urlParams['relatedLine'] = options.relatedLine;
    }

    if (typeof options.relatedStop !== 'undefined' && options.relatedStop) {
      urlParams['relatedStop'] = options.relatedStop;
    }

    if (typeof options.name !== 'undefined' && options.name) {
      urlParams['name'] = options.name;
    }

    return this.apiCall('trafficInfoList', urlParams);
  }

  private checkStatus(response: Response): Promise<Response> {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  private parseJson (response: Response): Promise<Response> {
    return response.json();
  }

  private apiCall(urlPath: string, urlParams: Record<string, any>): Promise<Record<string, unknown>> {
    const url = new URL('https://www.wienerlinien.at');

    url.pathname = `/ogd_realtime/${urlPath}`;
    url.search = queryString.stringify(urlParams);

    return fetch(url.href)
      .then(this.checkStatus)
      .then(this.parseJson)
      .then((response: any) => response.data)
      .catch(console.error);
  }
}

export {
  WienerLinien
};
