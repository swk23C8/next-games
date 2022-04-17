import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
	const session = await getSession({ req });

	console.log(session);

	if (!session) {
		return res.status(401).json({ message: 'Unauthorized', success: false });
	}

	if (req.method === 'POST') {

		const user = await prisma.user.findUnique({
			where: { email: session.user.email }
		});

		console.log(user);

		res.status(200).json({ name: 'John Doe' });
	}
	else {

	}
}