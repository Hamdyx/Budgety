import { camelCase, snakeCase, isPlainObject, isArray } from 'lodash-es';

function mapKeys(obj: unknown, mapper: (key: string) => string): unknown {
  if (isArray(obj)) {
    return obj.map(item => mapKeys(item, mapper));
  }

  if (isPlainObject(obj)) {
    const record = obj as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(record)) {
      result[mapper(key)] = mapKeys(record[key], mapper);
    }
    return result;
  }

  return obj;
}

export function toCamelCase<T>(data: unknown): T {
  return mapKeys(data, camelCase) as T;
}

export function toSnakeCase<T>(data: unknown): T {
  return mapKeys(data, snakeCase) as T;
}
