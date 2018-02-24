declare class WienerLinien {
    constructor(API_KEY: string);

    monitor(rbl: number|string|number[]|string[], options: ActiveTrafficInfo): Object;
    trafficInfoList(options: TrafficInfo): Object;
    newsList(options: ActiveTrafficInfo): Object;

    API_KEY: string;
    baseUrl?: string;
    reqUrl?: string;
}

interface ActiveTrafficInfo {
  activateTrafficInfo?: string|string[];
}

interface TrafficInfo {
  relatedLine?: number|string|number[]|string[];
  relatedStop?: number|string|number[]|string[];
  name?: string|string[];
}

interface NewsList {
  relatedLine?: number|string|number[]|string[];
  relatedStop?: number|string|number[]|string[];
  name?: string|string[];
}
