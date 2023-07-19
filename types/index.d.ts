type StringNumbers = number | string | number[] | string[];

declare class WienerLinien {
    constructor(fetch?: Fetch);

    monitor(rbl: StringNumbers, options: MonitorOptions): Promise<Record<string, unknown>>;
    newsList(options: NewsListOptions): Promise<Record<string, unknown>>;
    trafficInfoList(options: TrafficInfoOptions): Promise<Record<string, unknown>>;

    baseUrl?: string;
    reqUrl?: string;
}

type Fetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

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

type UrlParams = MonitorOptions | NewsListOptions | TrafficInfoOptions;
