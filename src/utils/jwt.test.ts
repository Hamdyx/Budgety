import { describe, expect, it } from 'vitest';

import { decodeJwtPayload } from './jwt';

/** Produces a Base64URL segment (no padding, `+`→`-`, `/`→`_`). */
function toBase64Url(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

describe('jwt', () => {
  describe('decodeJwtPayload', () => {
    it('decodes a standard Base64 encoded payload', () => {
      // given
      const payload = { sub: 'user-1', exp: 9999999999 };
      const token = `header.${btoa(JSON.stringify(payload))}.sig`;

      // when
      const result = decodeJwtPayload(token);

      // then
      expect(result).toEqual(payload);
    });

    it('decodes a Base64URL payload containing - and _', () => {
      // given – toBase64Url substitutes + for - and / for _ so the payload will
      // contain those characters whenever the standard Base64 does.
      const payload = { sub: 'user-1', exp: 9999999999 };
      const token = `header.${toBase64Url(JSON.stringify(payload))}.sig`;

      // when
      const result = decodeJwtPayload(token);

      // then
      expect(result).toEqual(payload);
    });

    it('decodes a Base64URL payload with missing padding', () => {
      // given – {"a":1} encodes to a segment whose length is not a multiple of 4
      const payload = { a: 1 };
      const token = `header.${toBase64Url(JSON.stringify(payload))}.sig`;

      // when
      const result = decodeJwtPayload(token);

      // then
      expect(result).toEqual(payload);
    });

    it('throws for a token with no payload segment', () => {
      // when / then
      expect(() => decodeJwtPayload('onlyone')).toThrow('Invalid JWT: missing payload segment');
    });

    it('throws for a payload that is not valid JSON', () => {
      // given
      const token = `header.${toBase64Url('not-json')}.sig`;

      // when / then
      expect(() => decodeJwtPayload(token)).toThrow('Invalid JWT: payload is not valid JSON');
    });
  });
});
