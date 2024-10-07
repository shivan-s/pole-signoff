import { Faker, en } from '@faker-js/faker';

export function generateFakeStagehandle(id?: number): string {
	const faker = new Faker({ locale: [en] });
	faker.seed(id);
	const name = faker.person.firstName().toLowerCase();
	return name;
}
