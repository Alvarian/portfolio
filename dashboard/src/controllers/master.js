const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { writeToLog } = require("../lib/logger");


const readAllUsers = async () => {	
	try {
		const result = await prisma.master.findMany();

		return result;
	} catch (err) {
		writeToLog(err);
	} finally {
		await prisma.$disconnect();
	}
};

const readOneUser = async (name) => {
	try {
		const result = await prisma.master.findUnique({
			where: {
				username: name,
			},
		});

		return result;
	} catch (err) {
		writeToLog(err);
	} finally {
		await prisma.$disconnect();
	}
};

const createUser = async (u, p) => {
	try {
		const result = await prisma.master.create({
			data: { 
				username: u,
				password: p
			},
		});

		return result;
	} catch (err) {
		writeToLog(err);
	} finally {
		await prisma.$disconnect();
	}
};

module.exports = { readAllUsers, readOneUser, createUser };