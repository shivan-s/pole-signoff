import { db } from '$lib/server/db';
import { and, eq, isNull } from 'drizzle-orm';
import { inviteCodesTable, usersTable, type SelectInviteCode, type SelectUser } from './schema';
import { getUUID } from '$lib/server/crypto';

export async function fetchInviteCodesFromUser(
	userId: number,
	opts?: { unusedOnly: boolean }
): Promise<SelectInviteCode[]> {
	const inviteCodes = await db
		.select()
		.from(inviteCodesTable)
		.where(
			and(
				eq(inviteCodesTable.senderId, userId),
				opts?.unusedOnly ? undefined : isNull(inviteCodesTable.receiverId)
			)
		);
	return inviteCodes;
}

export async function createInviteCodeForUser(userId: number): Promise<SelectInviteCode> {
	const [inviteCode] = await db
		.insert(inviteCodesTable)
		.values({ senderId: userId, uuid: getUUID() })
		.returning();
	return inviteCode;
}

export async function fetchInviteCode(
	inviteCode: string
): Promise<{ invite_codes: SelectInviteCode; users: SelectUser }> {
	const [sender] = await db
		.select()
		.from(inviteCodesTable)
		.innerJoin(usersTable, eq(inviteCodesTable.senderId, usersTable.id))
		.where(and(eq(inviteCodesTable.uuid, inviteCode)));
	return sender;
}
