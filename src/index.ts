import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

export class WienerLinien {
  /**
   * Returns real-time data for a station
   * @param {StringNumbers} rbl - RBL number
   * @param {MonitorOptions} options
   * @returns {object}
   */
  public monitor(rbl: StringNumbers, options: MonitorOptions = {}) {
    const urlParams: MonitorParams = {
      ...options,
      rbl: rbl
    };

    return this.apiCall('/monitor', urlParams);
  }

  /**
   * Returns news, elevator maintenance and other information
   * @param {NewsListOptions} options
   * @returns {object}
   */
  public newsList(options: NewsListOptions = {}) {
    return this.apiCall('newsList', options);
  }

  /**
   * Returns interruption of operations and elevator outage
   * @param {TrafficInfoOptions} options
   * @returns {object}
   */
  public trafficInfoList(options: TrafficInfoOptions = {}) {
    return this.apiCall('trafficInfoList', options);
  }

  private checkStatus(response: Response): Promise<Response> {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  private apiCall(urlPath: string, urlParams: UrlParams): Promise<Record<string, unknown>> {
    const url = new URL(`https://www.wienerlinien.at/ogd_realtime/${urlPath}`);
    url.search = queryString.stringify(urlParams);

    return fetch(url.href)
      .then(this.checkStatus)
      .then((response: Response) => response.json())
      .then((json: any) => json.data)
      .catch(console.error);
  }
}
