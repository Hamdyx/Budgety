export interface JwtPayload {
  sub: string;
  email: string;
  username: string;
  is_admin: boolean;
  exp: number;
}

/**
 * Decodes the payload segment of a JWT.
 *
 * JWTs use Base64URL encoding (RFC 4648 §5) which substitutes `+` → `-` and
 * `/` → `_`, and omits `=` padding. `atob` only accepts standard Base64, so
 * passing a Base64URL segment directly can throw for tokens whose payload
 * contains `-` or `_`, or whose length is not a multiple of 4.
 *
 * This helper normalises the segment back to standard Base64 before decoding.
 *
 * @param token - A compact JWT string in the form `header.payload.signature`.
 * @returns The decoded {@link JwtPayload} object parsed from the payload segment.
 *
 * @remarks
 * **This function does NOT verify the JWT signature.** It only decodes the
 * payload for reading claims (e.g. `exp`, `sub`). Cryptographic verification
 * is performed by the backend on every authenticated request. Never use this
 * function as a security gate — treat the decoded payload as informational only.
 */
export function decodeJwtPayload(token: string): JwtPayload {
  const base64url = token.split('.')[1];
  if (!base64url) throw new Error('Invalid JWT: missing payload segment');

  // Base64URL → standard Base64
  const base64 = base64url.replaceAll('-', '+').replaceAll('_', '/');

  // Restore padding stripped by Base64URL encoding
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

  try {
    return JSON.parse(atob(padded)) as JwtPayload;
  } catch {
    throw new Error('Invalid JWT: payload is not valid JSON');
  }
}
