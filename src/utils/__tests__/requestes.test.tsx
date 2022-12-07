import { describe, it, expect } from 'vitest';
import { parseLinkHeader } from '../requests';

describe('parse link header', () => {
  it('returns mapped object (with prev, next, first, last) from valid link header', () => {
    const linkHeader =
      '<http://localhost:3000/transactions?_page=1&_limit=20&_sort=date&_order=desc>; rel="first", <http://localhost:3000/transactions?_page=1&_limit=20&_sort=date&_order=desc>; rel="prev", <http://localhost:3000/transactions?_page=3&_limit=20&_sort=date&_order=desc>; rel="next", <http://localhost:3000/transactions?_page=3&_limit=20&_sort=date&_order=desc>; rel="last"';
    expect(parseLinkHeader(linkHeader)).toStrictEqual({
      first: '?_page=1&_limit=20&_sort=date&_order=desc',
      last: '?_page=3&_limit=20&_sort=date&_order=desc',
      prev: '?_page=1&_limit=20&_sort=date&_order=desc',
      next: '?_page=3&_limit=20&_sort=date&_order=desc',
    });
  });

  it('returns mapped object (with next, first, last, without prev) from valid link header', () => {
    const linkHeader =
      '<http://localhost:3000/transactions?_page=1&_limit=20&_sort=date&_order=desc>; rel="first", <http://localhost:3000/transactions?_page=2&_limit=20&_sort=date&_order=desc>; rel="next", <http://localhost:3000/transactions?_page=3&_limit=20&_sort=date&_order=desc>; rel="last"';
    expect(parseLinkHeader(linkHeader)).toStrictEqual({
      first: '?_page=1&_limit=20&_sort=date&_order=desc',
      last: '?_page=3&_limit=20&_sort=date&_order=desc',
      next: '?_page=2&_limit=20&_sort=date&_order=desc',
    });
  });

  it('returns empty object when link header is not provided', () => {
    expect(parseLinkHeader(null)).toStrictEqual({});
    expect(parseLinkHeader('')).toStrictEqual({});
  });
});
