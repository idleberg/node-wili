import { test } from 'uvu';
import { WienerLinien } from '../lib/wili.mjs';
import * as assert from 'uvu/assert';

const wl = new WienerLinien();

test('monitor() returns "monitors"', () => {
  return Promise.resolve(wl.monitor([4111, 4118, 4202, 4213, 4429, 4408]))
    .then(data => {
      const expected = true;
      const actual = 'monitors' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "monitors" (relatedLine)', () => {
  return Promise.resolve(wl.newsList({ relatedLine: ['U1', 'U2', 'U3', 'U4', 'U5', 'U6'] }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "pois" (relatedStop)', () => {
  return Promise.resolve(wl.newsList({ relatedStop: [304, 834] }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      assert.is(actual, expected);
    })
    .catch();
});

test('trafficInfoList() returns "trafficInfos" (relatedLine)', () => {
  return Promise.resolve(wl.trafficInfoList({ relatedLine: ['U1', 'U2', 'U3', 'U4', 'U5', 'U6'] }))
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
