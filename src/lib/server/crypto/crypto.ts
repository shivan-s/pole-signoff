import { SECRET } from '$env/static/private';
import type { SelectPassword, SelectUser } from '$lib/server/db/schema';
import * as jose from 'jose';
import { JWEInvalid, JWTExpired } from 'jose/errors';
import Hash from './hash';
import { v4 as uuid } from 'uuid';

/**
 * Check password for a given user
 *
 * @param password Entered password
 * @param user User to check password against
 * @returns Valid password
 */
export async function checkPassword(
	password: string,
	user: { users: SelectUser; passwords: SelectPassword } | undefined
): Promise<boolean> {
	const hash = new Hash(user?.passwords?.hash);
	const validLogin = await hash.check(password);
	return validLogin;
}

/**
 * Hashes password so it can be saved onto the database
 *
 * @param password Password from user
 * @returns Hash (class that contains hashed string of password)
 * @see Hash
 */
export async function hashPassword(password: string): Promise<Hash> {
	const hash = await Hash.from(password);
	return hash;
}

/**
 * Issue a JWT token for logging in user
 *
 * @param payload Typically user details
 * @returns Signed JWT
 */
export async function issueJWT(user: Pick<SelectUser, 'id' | 'stagehandle'>): Promise<string> {
	const secret = new TextEncoder().encode(SECRET);
	const alg = 'HS256';
	const JWT_EXPIRE_TIME = '1 week';
	const jwt = await new jose.SignJWT({ user: { id: user.id, username: user.stagehandle } })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(JWT_EXPIRE_TIME)
		.sign(secret);
	return jwt;
}

export async function decodeJWT(
	jwt: string
): Promise<({ user?: Pick<SelectUser, 'id' | 'stagehandle'> } & jose.JWTPayload) | null> {
	const secret = new TextEncoder().encode(SECRET);
	try {
		const { payload } = (await jose.jwtVerify(jwt, secret)) as {
			payload: { user?: SelectUser } & jose.JWTPayload;
		};
		return payload;
	} catch (err) {
		if (err instanceof JWEInvalid && err.code === 'ERR_JWE_INVALID') {
			console.log('JWE invalid');
			return null;
		}
		if (err instanceof JWTExpired) {
			console.log('JWT Expired');
			return null;
		}
		throw err;
	}
}

/**
 * Return uuid
 */
export function getUUID() {
	return uuid();
}
