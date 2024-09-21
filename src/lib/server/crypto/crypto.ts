import { SECRET } from '$env/static/private';
import type { Password, User } from '$lib/server/db/schema';
import * as jose from 'jose';
import { JWEInvalid } from 'jose/errors';

/**
 * Check password for a given user
 *
 * @param password Entered password
 * @param user User to check password against
 * @returns Valid password
 */
export async function checkPassword(
	password: string,
	user: { users: User; passwords: Password } | undefined
): Promise<boolean> {
	// const validLogin = await bcrypt.compare(password, user?.passwords?.hash ?? '');
	// return validLogin;
	return false;
}

/**
 * Issue a JWT token for logging in user
 *
 * @param payload Typically user details
 * @returns Signed JWT
 */
export async function issueJWT(user: Pick<User, 'id' | 'username'>): Promise<string> {
	const secret = new TextEncoder().encode(SECRET);
	const alg = 'HS256';
	const JWT_EXPIRE_TIME = '1 week';
	const jwt = await new jose.SignJWT({ user: { id: user.id, username: user.username } })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(JWT_EXPIRE_TIME)
		.sign(secret);
	return jwt;
}

export async function decodeJWT(
	jwt: string
): Promise<({ user?: Pick<User, 'id' | 'username'> } & jose.JWTPayload) | null> {
	const secret = new TextEncoder().encode(SECRET);
	try {
		const { payload } = (await jose.jwtVerify(jwt, secret)) as {
			payload: { user?: User } & jose.JWTPayload;
		};
		return payload;
	} catch (err) {
		if (err instanceof JWEInvalid && err.code === 'ERR_JWE_INVALID') {
			console.log('JWE invalid');
			return null;
		}
		throw err;
	}
}
