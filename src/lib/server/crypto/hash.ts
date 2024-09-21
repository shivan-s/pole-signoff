interface Hash {
	hash: string;
}
/**
 * Hash class is essentially a type for extra precaution when saving to the
 *	database (i.e. direct string can't be passed)
 */
class Hash implements Hash {
	constructor(s: string) {
		// const salt = await bcrypt.genSalt(10);
		// const hash = await bcrypt.hash(s, salt);
		this.hash = hash;
	}
}

export default Hash;
