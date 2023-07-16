import { test } from 'uvu';
import { createWienerLinien } from '../src/index';
import * as assert from 'uvu/assert';

const wl = createWienerLinien();

test('monitor() returns "monitors - string"', () => {
  return Promise.resolve(wl.monitor('4111'))
    .then(data => {
      const expected = true;
      const actual = 'monitors' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('monitor() returns "monitors" - number', () => {
  return Promise.resolve(wl.monitor(4111))
    .then(data => {
      const expected = true;
      const actual = 'monitors' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('monitor() returns "monitors - string[]"', () => {
  return Promise.resolve(wl.monitor(['4111', '4118', '4202', '4213', '4429', '4408']))
    .then(data => {
      const expected = true;
      const actual = 'monitors' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('monitor() returns "monitors" - number[]', () => {
  return Promise.resolve(wl.monitor([4111, 4118, 4202, 4213, 4429, 4408]))
    .then(data => {
      const expected = true;
      const actual = 'monitors' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "monitors" (relatedLine) - string[]', () => {
  return Promise.resolve(wl.newsList({ relatedLine: ['37', '38', '41', '42', '43', '44'] }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "monitors" (relatedLine) - number[]', () => {
  return Promise.resolve(wl.newsList({ relatedLine: [37, 38, 41, 42, 43, 44] }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "monitors" (relatedLine) - string', () => {
  return Promise.resolve(wl.newsList({ relatedLine: '37' }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "monitors" (relatedLine) - number[]', () => {
  return Promise.resolve(wl.newsList({ relatedLine: 37 }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "pois" (relatedStop) - string', () => {
  return Promise.resolve(wl.newsList({ relatedStop: '304' }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "pois" (relatedStop) - number', () => {
  return Promise.resolve(wl.newsList({ relatedStop: 304 }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "pois" (relatedStop) - string[]', () => {
  return Promise.resolve(wl.newsList({ relatedStop: ['304', '834'] }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "pois" (relatedStop) - number[]', () => {
  return Promise.resolve(wl.newsList({ relatedStop: [304, 834] }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('trafficInfoList() returns "trafficInfos" (relatedLine) - string[]', () => {
  return Promise.resolve(wl.trafficInfoList({ relatedLine: ['37', '38', '41', '42', '43', '44'] }))
    .then(data => {
      const expected = true;
      const actual = 'trafficInfos' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('trafficInfoList() returns "trafficInfos" (relatedLine) - number[]', () => {
  return Promise.resolve(wl.trafficInfoList({ relatedLine: [37, 38, 41, 42, 43, 44] }))
    .then(data => {
      const expected = true;
      const actual = 'trafficInfos' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('trafficInfoList() returns "trafficInfos" (relatedLine) - string', () => {
  return Promise.resolve(wl.trafficInfoList({ relatedLine: '37' }))
    .then(data => {
      const expected = true;
      const actual = 'trafficInfos' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('trafficInfoList() returns "trafficInfos" (relatedLine) number', () => {
  return Promise.resolve(wl.trafficInfoList({ relatedLine: 37 }))
    .then(data => {
      const expected = true;
      const actual = 'trafficInfos' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('trafficInfoList() returns "trafficInfos"', () => {
  return Promise.resolve(wl.trafficInfoList())
    .then(data => {
      const expected = true;
      const actual = 'trafficInfos' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test.run();
