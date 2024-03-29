import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
	if (req.method === 'POST') {
		return await makeAccount(req, res);
	}
	else {
		return res.status(405).json({ message: 'Method not allowed', success: false });
	}
}

async function makeAccount(req, res) {
	const body = req.body;
	try {
		const newEntry = await prisma.inquiry.create({
			data: {
				name: body.name,
				email: body.email,
				image: body.image,
				gameToken: 1000
			}
		});
		return res.status(200).json(newEntry, { success: true });
	} catch (error) {
		console.error("Request error", error);
		res.status(500).json({ error: "Error creating question", success: false });
	}
}