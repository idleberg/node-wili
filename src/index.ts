import type Wili from '../types/index.d.ts';

/**
 * Creates an instance of the WienerLinien API client.
 * @param {function} fetchParam - The fetch function to use for making HTTP requests.
 * @throws {TypeError} - If the supplied fetch parameter is not a function.
 * @returns {Object} - The WienerLinien API client.
 */
export function createWienerLinien(fetchParam = globalThis.fetch) {
	if (typeof fetchParam !== 'function') {
		throw new TypeError('The supplied fetch parameter is not a function');
	}

	/**
	 * Returns real-time data for a station.
	 * @param {string} rbl - The RBL number.
	 * @param {Object} options - The monitor options.
	 * @returns {Promise<Object>} - The real-time data for the station.
	 */
	async function monitor(rbl: Wili.StringNumbers, options = {}): Promise<Wili.MonitorResponse> {
		const urlParams: Wili.MonitorParams = {
			...options,
			rbl: rbl,
		};

		return (await apiCall('/monitor', urlParams)) as Wili.MonitorResponse;
	}

	/**
	 * Returns news, elevator maintenance, and other information.
	 * @param {Object} options - The news list options.
	 * @returns {Promise<Object>} - The news and information.
	 */
	async function newsList(options = {}): Promise<Wili.NewsListResponse> {
		return (await apiCall('newsList', options)) as Wili.NewsListResponse;
	}

	/**
	 * Returns interruptions of operations and elevator outages.
	 * @param {Object} options - The traffic info options.
	 * @returns {Promise<Object>} - The traffic information.
	 */
	async function trafficInfoList(options = {}): Promise<Wili.TrafficInfoListResponse> {
		return (await apiCall('trafficInfoList', options)) as Wili.TrafficInfoListResponse;
	}

	/**
	 * Builds the URL for making API requests.
	 * @param {string} urlPath - The URL path.
	 * @param {Object} urlParams - The URL parameters.
	 * @returns {URL} - The constructed URL.
	 */
	function buildUrl(urlPath: string, urlParams: Wili.UrlParams) {
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

	/**
	 * Checks the response status and throws an error if it's not OK.
	 * @param {Response} response - The HTTP response.
	 * @returns {Promise<Response>} - The resolved response if the status is OK.
	 * @throws {Error} - If the response status is not OK.
	 */
	async function checkStatus(response: Response) {
		if (response.ok) {
			return response;
		} else {
			throw new Error(`HTTP ${response.status}: ${response.statusText} (${response.url})`);
		}
	}

	/**
	 * Makes an API call to the specified URL path with the given parameters.
	 * @param {string} urlPath - The URL path.
	 * @param {Object} urlParams - The URL parameters.
	 * @returns {Promise<Object>} - The API response data.
	 */
	async function apiCall(urlPath: string, urlParams: Wili.UrlParams) {
		const url = buildUrl(urlPath, urlParams);

		const response = await fetchParam(url.href);
		const checkedResponse = await checkStatus(response);
		const json = (await checkedResponse.json()) as { data: unknown };

		return json.data;
	}

	return {
		monitor,
		newsList,
		trafficInfoList,
	};
}
