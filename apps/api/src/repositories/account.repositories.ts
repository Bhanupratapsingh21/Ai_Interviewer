import { prisma } from '../lib/prisma';

export const AccountRepository = {
  async findByEmail(email: string) {
    return prisma.account.findUnique({
      where: { email },
      include: { userProfile: true, companyProfile: true },
    });
  },

  async findByUsername(username: string) {
    return prisma.account.findUnique({
      where: { username },
    });
  },

  async create(data: {
    email: string;
    username: string;
    passwordHash: string;
    role: 'USER' | 'COMPANY';
    fullName: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          email: data.email,
          username: data.username,
          passwordHash: data.passwordHash,
          role: data.role,
        },
      });

      if (data.role === 'USER') {
        await tx.userProfile.create({
          data: {
            accountId: account.id,
            fullName: data.fullName,
          },
        });
      } else {
        await tx.companyProfile.create({
          data: {
            accountId: account.id,
            companyName: data.fullName,
          },
        });
      }

      return account;
    });
  },

  async findById(id: string) {
    return prisma.account.findUnique({
      where: { id },
      include: { userProfile: true, companyProfile: true },
    });
  },
};