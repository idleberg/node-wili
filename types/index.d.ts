declare namespace Wili {
  function createWienerLinien(fetchParam?: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>): {
    monitor(rbl: StringNumbers, options: MonitorOptions): Promise<Record<string, unknown>>;
    newsList(options: NewsListOptions): Promise<Record<string, unknown>>;
    trafficInfoList(options: TrafficInfoOptions): Promise<Record<string, unknown>>;
  }

  type Fetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
  type StringNumbers = number | string | number[] | string[];
  type UrlParams = MonitorOptions | NewsListOptions | TrafficInfoOptions;

  type MonitorOptions = {
    activateTrafficInfo?: string | string[];
  }

  interface MonitorParams extends MonitorOptions {
    rbl?: StringNumbers;
  }

  type NewsListOptions = {
    name?: string | string[];
    relatedLine?: StringNumbers;
    relatedStop?: StringNumbers;
  }

  type TrafficInfoOptions = {
    name?: string | string[];
    relatedLine?: StringNumbers;
    relatedStop?: StringNumbers;
  }
}

export = Wili;
export as namespace Wili;
