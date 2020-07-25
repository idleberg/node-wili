declare class WienerLinien {
    constructor(API_KEY?: string);

    monitor(rbl: number | string | number[] | string[], options: MonitorOptions): unknown;
    newsList(options: NewsListOptions): unknown;
    trafficInfoList(options: TrafficInfoOptions): unknown;

    API_KEY: string;
    baseUrl?: string;
    reqUrl?: string;
}

interface MonitorOptions {
  activateTrafficInfo?: string|string[];
}

interface MonitorParams extends MonitorOptions {
  rbl: number | string | number[] | string[];
  sender?: string
}

interface TrafficInfoOptions {
  relatedLine?: number | string | number[] | string[];
  relatedStop?: number | string | number[] | string[];
  name?: string | string[];
}

interface TrafficInfoParams extends TrafficInfoOptions {
  sender?: string
}

interface NewsListOptions {
  relatedLine?: number | string | number[] | string[];
  relatedStop?: number | string | number[] | string[];
  name?: string | string[];
}

interface NewsListParams extends NewsListOptions {
  sender?: string
}
