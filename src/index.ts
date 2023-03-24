export class WienerLinien {
  #fetch;

  constructor(fetchParam = globalThis.fetch) {
    if (typeof fetch !== 'function') {
      throw new TypeError('The supplied fetch parameter is not a function');
    }

    this.#fetch = fetchParam;
  }
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

    return this.#apiCall('/monitor', urlParams);
  }

  /**
   * Returns news, elevator maintenance and other information
   * @param {NewsListOptions} options
   * @returns {object}
   */
  public newsList(options: NewsListOptions = {}) {
    return this.#apiCall('newsList', options);
  }

  /**
   * Returns interruption of operations and elevator outage
   * @param {TrafficInfoOptions} options
   * @returns {object}
   */
  public trafficInfoList(options: TrafficInfoOptions = {}) {
    return this.#apiCall('trafficInfoList', options);
  }

  #buildUrl(urlPath: string, urlParams: UrlParams) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(urlParams)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          searchParams.append(key, String(item));
        }
      } else {
        searchParams.set(key, String(value));
      }
    }

    return new URL(`https://www.wienerlinien.at/ogd_realtime/${urlPath}?${searchParams.toString()}`);
  }

  #checkStatus(response: Response): Promise<Response> {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  #apiCall(urlPath: string, urlParams: UrlParams): Promise<Record<string, unknown>> {
    const url = this.#buildUrl(urlPath, urlParams);

    return this.#fetch(url.href)
      .then(this.#checkStatus)
      .then((response: Response) => response.json())
      .then((json: any) => json.data)
      .catch(console.error);
  }
}
