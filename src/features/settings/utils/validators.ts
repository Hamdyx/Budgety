type GetFieldValue = (field: string) => unknown;

/**
 * Custom validator for Ant Design forms that checks if the "confirm new password"
 *
 * @param getFieldValue - Ant Design form utility for retrieving values of other fields.
 * @param value - The value of the "confirm new password" field to validate.
 * @returns A promise that resolves if the confirm password matches the new password, or rejects with an error message if they do not match.
 */
export function validatePasswordsMatch(getFieldValue: GetFieldValue) {
  return (_rule: unknown, value: string): Promise<void> => {
    if (!value || getFieldValue('newPassword') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Passwords do not match'));
  };
}
