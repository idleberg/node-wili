# wili

[![License](https://img.shields.io/github/license/idleberg/node-wili?color=blue&style=for-the-badge)](https://github.com/idleberg/node-wili/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/wili?style=for-the-badge)](https://www.npmjs.org/package/wili)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/node-wili/default.yml?style=for-the-badge)](https://github.com/idleberg/node-wili/actions)

[English](README.md) | **Deutsch**

Node Wrapper für die Echtzeitdaten-API der Wiener Linien

## Installation

`npm install wili`

## Anwendung

Beispielanwendung:

```js
import { createWienerLinien } from 'wili';

const wili = createWienerLinien();

const options = {
  relatedLine: ['U2', 'U4', 'U6']
};

// Promise API
wili.trafficInfoList(options)
  .then( data => {
    console.log(data.trafficInfos);
  })
  .catch( error => {
    console.error(error);
  });

// async/await
try {
  const data = await wili.trafficInfoList(options);
  console.log(data.trafficInfos);
} catch (output) {
  console.error(error);
}
```

:warning: Für NodeJS-Versionen unterhalb v18, muss die Klasse mit einer `fetch`-Implementierung instanziert werden.

**Beispiel**

```js
import { createWienerLinien } from 'wili';
import fetch from 'isomorphic-fetch';

const wili = createWienerLinien(fetch);
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
