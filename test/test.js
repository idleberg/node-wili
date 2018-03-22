// Dependencies
import WienerLinien from '../lib/index';
import { test } from 'ava';

const wl = new WienerLinien();

// If you want to run any of these tests locally, keep in mind to set
// a WIENER_LINIEN_API_KEY environmental variable containing a valid API key
test('Found environmental variable WIENER_LINIEN_API_KEY', t => {
  const expected = undefined;
  const actual = process.env.WIENER_LINIEN_API_KEY;

  t.not(actual, expected, "You need define the environmental variable `WIENER_LINIEN_API_KEY` containing a valid Wiener Linien API key");
});

test('monitor() returns "monitors"', t => {
  return Promise.resolve(wl.monitor([4111, 4118, 4202, 4213, 4429, 4408]))
    .then(data => {
      const expected = true;
      const actual = 'monitors' in data;

      t.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "monitors" (relatedLine)', t => {
  return Promise.resolve(wl.newsList({ relatedLine: ['U1', 'U2', 'U3', 'U4', 'U5', 'U6'] }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      t.is(actual, expected);
    })
    .catch();
});

test('newsList() returns "pois" (relatedStop)', t => {
  return Promise.resolve(wl.newsList({ relatedStop: [304, 834] }))
    .then(data => {
      const expected = true;
      const actual = 'pois' in data;

      t.is(actual, expected);
    })
    .catch();
});

test('trafficInfoList() returns "trafficInfos" (relatedLine)', t => {
  return Promise.resolve(wl.trafficInfoList({ relatedLine: ['U1', 'U2', 'U3', 'U4', 'U5', 'U6'] }))
    .then(data => {
      const expected = true;
      const actual = 'trafficInfos' in data;

      t.is(actual, expected);
    })
    .catch();
});

test('trafficInfoList() returns "trafficInfos"', t => {
  return Promise.resolve(wl.trafficInfoList())
    .then(data => {
      const expected = true;
      const actual = 'trafficInfos' in data;

      t.is(actual, expected);
    })
    .catch();
});
