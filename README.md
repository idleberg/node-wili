# wili

[![License](https://img.shields.io/github/license/idleberg/node-wili?color=blue&style=for-the-badge)](https://github.com/idleberg/node-wili/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/wili?style=for-the-badge)](https://www.npmjs.org/package/wili)
![GitHub branch check runs](https://img.shields.io/github/check-runs/idleberg/node-wili/main?style=for-the-badge)

**English** | [Deutsch](README.de.md)

A Node wrapper for the Wiener Linien public transport API

## Installation

`npm install wili`

## Usage

Example usage in script:

```js
import { createWienerLinien } from 'wili';

const wili = createWienerLinien();

const options = {
  relatedLine: ['U2', 'U4', 'U6']
};

 const { trafficInfos } = await wili.trafficInfoList(options);
```

:warning: For NodeJS versions lower than v18, the class needs to be instantiated with a `fetch`-implementation

**Example**

```js
import { createWienerLinien } from 'wili';
import fetch from 'isomorphic-fetch';

const wili = createWienerLinien(fetch);
```

## API

### monitor

Usage: `monitor(rbl, [options])`

Returns real-time data for a station, including train information such as identifier or accessibility features.

#### Parameters:

#### `rbl`

Type: `String`, `Integer`, `Array`

RBL number (Rechnergestütztes Betriebsleitsystem - computer-aided operations control system), can be found this [website](https://till.mabe.at/rbl/?line=214433687&station=231116899)

##### `options.activeTrafficInfo`

Type: `String`, `Array`

Disruption type (`stoerungkurz`, `stoerunglang`, or `aufzugsinfo`)

### newsList

Usage: `newsList(options)`

Returns news, elevator maintenance and other information

#### Options

##### `options.relatedLine`

Type: `String`, `Integer`, `Array`

Train or bus number, e.g. U1, S7, 59A (case-insensitive)

##### `options.relatedStop`

Type: `String`, `Integer`, `Array`

Station ID

##### `options.name`

Type: `String`, `Array`

Information category, e.g `news` or `aufzugsservice`

### trafficInfoList

Usage: `trafficInfoList([options])`

Returns interruption of operations and elevator outage

#### Options

##### `options.relatedLine`

Type: `String`, `Integer`, `Array`

Train or bus number, e.g. U1, S7, 59A (case-insensitive)

##### `options.relatedStop`

Type: `String`, `Integer`, `Array`

Station ID

##### `options.name`

Type: `String`, `Array`

Disruption type (`stoerungkurz`, `stoerunglang`, or `aufzugsinfo`)

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)
