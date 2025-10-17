declare namespace Wili {
	type Fetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
	type StringNumbers = number | string | number[] | string[];
	type UrlParams = MonitorOptions | NewsListOptions | TrafficInfoOptions;

	type MonitorOptions = {
		activateTrafficInfo?: string | string[];
	};

	interface MonitorParams extends MonitorOptions {
		rbl?: StringNumbers;
	}

	type NewsListOptions = {
		name?: string | string[];
		relatedLine?: StringNumbers;
		relatedStop?: StringNumbers;
	};

	type TrafficInfoOptions = {
		name?: string | string[];
		relatedLine?: StringNumbers;
		relatedStop?: StringNumbers;
	};

	type MonitorResponse = {
		monitors: unknown[];
		[key: string]: unknown;
	};

	type NewsListResponse = {
		pois: unknown[];
		[key: string]: unknown;
	};

	type TrafficInfoListResponse = {
		trafficInfos: unknown[];
		[key: string]: unknown;
	};
}

export default Wili;
export { Wili };
