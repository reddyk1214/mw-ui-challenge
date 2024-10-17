import { expect, test } from 'vitest';
import { createTransform } from './transform';
import { AAPL, AMZN, DIS, WMT, createNamedPosition } from '../__test__/fixtures';

const GME = createNamedPosition('GME', 'GameStop Corp.');

const positions = [AAPL, AMZN, DIS, WMT, GME];

test('exports a createTransform function', () => {
  expect(createTransform).toBeInstanceOf(Function);
});

test('returns all positions when searchText is empty', () => {
  const transform = createTransform('');
  const result = transform(positions);
  expect(result).toEqual(positions);
});

test('filters positions by ticker that starts with searchText', () => {
  const transform = createTransform('AAPL');
  const result = transform(positions);
  expect(result).toEqual([AAPL]);
});

test('filters positions by ticker case-insensitively', () => {
  const transform = createTransform('aapl');
  const result = transform(positions);
  expect(result).toEqual([AAPL]);
});

test('filters positions by name containing searchText', () => {
  const transform = createTransform('Amazon');
  const result = transform(positions);
  expect(result).toEqual([AMZN]);
});

test('filters positions by partial name match', () => {
  const transform = createTransform('walt');
  const result = transform(positions);
  expect(result).toEqual([DIS]);
});

test('filters positions by partial name match (not at start)', () => {
  const transform = createTransform('Disney');
  const result = transform(positions);
  expect(result).toEqual([DIS]);
});

test('positions by partial start ticker match', () => {
  const AAMZ = createNamedPosition('AAMZ', 'AAMZ Marketplace Inc', 100);

  const newPositions = [
    AAPL,
    AAMZ, 
    AMZN
  ];
  const transform = createTransform('AAM');
  const result = transform(newPositions);
  expect(result).toEqual([AAMZ]);
});

test('sorts positions by partial ticker match before name match', () => {
  const AAMZ = createNamedPosition('AAMZ', 'AAMZ Marketplace Inc', 100);

  const newPositions = [
    AAPL,
    AAMZ, 
    AMZN
  ];
  const transform = createTransform('AA');
  const result = transform(newPositions);
  expect(result).toEqual([AAMZ, AAPL]);
});


test('returns an empty array if no position matches searchText', () => {
  const transform = createTransform('XYZ');
  const result = transform(positions);
  expect(result).toEqual([]);
});

test('retains original order for ties when sorting', () => {
  const similarPositions = [
    createNamedPosition('TEST', 'Test Corp A', 5000),
    createNamedPosition('TEST', 'Test Corp B', 10000),
    createNamedPosition('TEST', 'Test Corp C', 20000)
  ];
  const transform = createTransform('TEST');
  const result = transform(similarPositions);
  expect(result).toEqual(similarPositions);
});

test('prioritizes exact ticker match over name match', () => {
  const transform = createTransform('GME');
  const result = transform(positions);
  expect(result).toEqual([GME]);
});

test('sorts positions by name match after ticker match', () => {
  const INC = createNamedPosition('INC', 'Inc Marketplace', 100);
  const transform = createTransform('Inc');
  const newPosition = [...positions, INC];
  const result = transform(newPosition);
  expect(result).toEqual([INC, AAPL, AMZN, WMT]);
});

test('sorts positions by partial ticker match, ticker starts with, and partial name match', () => {
  const AAMZ = createNamedPosition('AAMZ', 'AAMZ Marketplace Inc', 100);
  const XYZ_MARKET = createNamedPosition('XYZ', 'AMZ Marketplace Inc', 2000);

  const newPositions = [AAPL, AAMZ, AMZN, XYZ_MARKET];

  const transform = createTransform('AMZ');
  const result = transform(newPositions);

  expect(result).toEqual([
    AMZN,
    XYZ_MARKET,
    AAMZ,         
  ]);
});
