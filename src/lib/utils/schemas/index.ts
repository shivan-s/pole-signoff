import { z } from 'zod';

const StageHandle = z
	.string()
	.trim()
	.min(6)
	.max(16)
	.toLowerCase()
	.refine(
		// eslint-disable-next-line no-useless-escape
		(data) => /^[a-z\._0-9]*$/.test(data),
		"Stage handle can only contain lower case letters (a-z), '.' and/or '_'"
	);

const Password = z.string().trim().min(8).max(128);

export const LoginSchema = z
	.object({
		stagehandle: StageHandle,
		password: Password
	})
	.strip();

export const SignupSchema = z
	.object({
		stagehandle: StageHandle,
		password: Password
	})
	.strip();

export const InviteCodeSchema = z
	.object({
		inviteCode: z.string().uuid()
	})
	.strip();
