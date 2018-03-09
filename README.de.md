# wili

[![npm](https://img.shields.io/npm/l/wili.svg?style=flat-square)](https://www.npmjs.org/package/wili)
[![npm](https://img.shields.io/npm/v/wili.svg?style=flat-square)](https://www.npmjs.org/package/wili)
[![Travis](https://img.shields.io/travis/idleberg/node-wili.svg?style=flat-square)](https://travis-ci.org/idleberg/node-wili)
[![David](https://img.shields.io/david/idleberg/node-wili.svg?style=flat-square)](https://david-dm.org/idleberg/node-wili)
[![David](https://img.shields.io/david/dev/idleberg/node-wili.svg?style=flat-square)](https://david-dm.org/idleberg/node-wili?type=dev)

Node Wrapper für das Echtzeitdaten API der Wiener Linien

## Installation

`yarn add wili || npm install wili`

## Voraussetzungen

Ein gültiger API Key wird vorausgesetzt, [hier](https://www.wien.gv.at/formularserver2/user/formular.aspx?pid=3b49a23de1ff43efbc45ae85faee31db&pn=B0718725a79fb40f4bb4b7e0d2d49f1d1) kannst Du einen beantragen. 

## Anwendung

Das Modul lässt sich per ES6 Imports oder `require()` importieren:

```js
// ECMAScript Import
import WienerLinien from 'wili';

// CommonJS Require
const WienerLinien = require('wili');
```

Beispielanwendung:

```js
import WienerLinien from 'wili';

// Der API-Key kann weggelassen werden, wenn
// process.env.WIENER_LINIEN_API_KEY gesetzt ist
const wl = new WienerLinien(API_KEY);

wl.trafficInfoList({ relatedLine: ['U2', 'U4', 'U6'] })
.then( data => {
    console.log(data.trafficInfos);
}).catch( error => {
  console.error(error);
});
```

## API

### monitor

Verwendung: `monitor(rbl, [options])`

Die Monitor Schnittstelle liefert Echtzeiten oder Planzeiten der nächsten 70 Minuten für einen Haltepunkt

#### Parameter:

#### `rbl`

Typen: `String`, `Integer`, `Array`

RBL Nummer (Rechnergestütztes Betriebsleitsystem), lässt sich [hier](https://till.mabe.at/rbl/?line=214433687&station=231116899) abfragen

##### `options.activeTrafficInfo`

Typen: `String`, `Array`

Störungstypen: `stoerungkurz`, `stoerunglang` oder `aufzugsinfo`

### newsList

Verwendung: `newsList(options)`

Die Schnittstelle liefert Neuigkeiten wie „Aktuelles“ oder „Aufzugswartungen”

#### Optionen

##### `options.relatedLine`

Typen: `String`, `Integer`, `Array`

Name der Linie, z.B. U1, S7, 59A (schreibungsunabhängig)

##### `options.relatedStop`

Typen: `String`, `Integer`, `Array`

Haltepunkt ID der Haltestelle

##### `options.name`

Typen: `String`, `Array`

Name der Nachrichtenkategorie, z.B `news` oder `aufzugsservice`

### trafficInfoList

Verwendung: `trafficInfoList([options])`

Die Schnittstelle liefert Störungen

#### Optionen

##### `options.relatedLine`

Typen: `String`, `Integer`, `Array`

Name der Linie, z.B. U1, S7, 59A (schreibungsunabhängig)

##### `options.relatedStop`

Typen: `String`, `Integer`, `Array`

Haltepunkt ID der Haltestelle

##### `options.name`

Typen: `String`, `Array`

Störungstypen: `stoerungkurz`, `stoerunglang` oder `aufzugsinfo`

## Lizenz

Diese Software unterliegt den Bestimmungen der [MIT Lizenz](https://opensource.org/licenses/MIT)

## Spenden

Wenn Du mir einen Kaffee oder ein Bier ausgeben möchtest, freue mich über Spenden via [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/node-wili) oder Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
