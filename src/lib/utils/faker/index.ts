import { Faker, en } from '@faker-js/faker';

export function generateFakeStagehandle(id?: number): string {
	const faker = new Faker({ locale: [en] });
	faker.seed(id);
	const name = `${faker.word.adjective({ length: { min: 4, max: 7 }, strategy: 'closest' }).toLowerCase()}.${faker.word.noun({ length: { min: 4, max: 7 }, strategy: 'closest' }).toLowerCase()}`;
	return name;
}

export function generateInviteCode(seed?: number): string {
	const faker = new Faker({ locale: [en] });
	faker.seed(seed);
	const inviteCode = faker.word.words(4);
	return inviteCode.split(' ').join('');
}
