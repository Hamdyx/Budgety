type GetFieldValue = (field: string) => unknown;
type PasswordMatchValidator = (_rule: unknown, value: string) => Promise<void>;

/**
 * Creates an Ant Design validator that checks whether the confirm password matches
 * the current new password field value.
 *
 * @param getFieldValue - Ant Design form helper used to read the current new password value.
 * @returns A validator function that resolves when the confirm password is empty or
 * matches the new password value, and rejects with a mismatch error otherwise.
 */
export function validatePasswordsMatch(getFieldValue: GetFieldValue): PasswordMatchValidator {
  return (_rule: unknown, value: string): Promise<void> => {
    if (!value || getFieldValue('newPassword') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Passwords do not match'));
  };
}
