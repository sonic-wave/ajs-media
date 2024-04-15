import geolocationEnter from '../geolocationEnter';

test('first test', () => {
  const testStr = '51.50851, -0.12572';

  const result = geolocationEnter(testStr);
  const test = {latitude: '51.50851', longitude: '-0.12572'};

  expect(result).toEqual(test);
});

test('second test', () => {
  const testStr = '51.50851,-0.12572';

  const result = geolocationEnter(testStr);
  const test = {latitude: '51.50851', longitude: '-0.12572'};

  expect(result).toEqual(test);
});

test('thirds test', () => {
  const testStr = '[51.50851, -0.12572]';

  const result = geolocationEnter(testStr);
  const test = {latitude: '51.50851', longitude: '-0.12572'};

  expect(result).toEqual(test);
});

