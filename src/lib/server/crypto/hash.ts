import bcrypt from 'bcryptjs';

/**
 * Hash class is essentially a type for extra precaution when saving to the
 *	database (i.e. direct string can't be passed).
 *
 * @example
 * const h = await Hash.from('password') // Creates hash
 *
 */
class Hash {
	hash: string;
	constructor(hash?: string) {
		this.hash = hash || '';
	}

	/**
	 * @param s string to be hashed
	 * @returns Hash instance with hash, original string is not stored
	 */
	static async from(s: string): Promise<Hash> {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(s, salt);
		return new Hash(hash);
	}

	/**
	 * @param s string to check against hash
	 * @return boolean of check
	 */
	async check(s: string): Promise<boolean> {
		return await bcrypt.compare(s, this.hash);
	}
}

export default Hash;
