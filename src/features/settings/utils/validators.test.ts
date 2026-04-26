import { describe, expect, it } from 'vitest';

import { validatePasswordsMatch } from './validators';

describe('validatePasswordsMatch', () => {
  it('resolves when value is empty', async () => {
    // given
    const getFieldValue = () => 'NewPass123';

    // when
    const validator = validatePasswordsMatch(getFieldValue);

    // then
    await expect(validator({}, '')).resolves.toBeUndefined();
  });

  it('resolves when passwords match', async () => {
    // given
    const getFieldValue = () => 'NewPass123';

    // when
    const validator = validatePasswordsMatch(getFieldValue);

    // then
    await expect(validator({}, 'NewPass123')).resolves.toBeUndefined();
  });

  it('rejects when passwords do not match', async () => {
    // given
    const getFieldValue = () => 'NewPass123';

    // when
    const validator = validatePasswordsMatch(getFieldValue);

    // then
    await expect(validator({}, 'DifferentPass')).rejects.toThrow('Passwords do not match');
  });
});
