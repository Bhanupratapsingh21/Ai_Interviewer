import { AccountRepository } from '../repositories/account.repositories';
import { hashPassword, verifyPassword } from '../lib/password'; 
import { signToken, verifyToken } from '../lib/jwt';
import { prisma } from '../lib/prisma';

export const AuthService = {
  async signup(data: {
    email: string;
    username: string;
    password: string;
    fullName: string;
    role: 'USER' | 'COMPANY';
  }) {
    // Check if email exists
    const existingEmail = await AccountRepository.findByEmail(data.email);
    if (existingEmail) {
      throw new Error('Email already registered');
    }

    // Check if username exists
    const existingUsername = await AccountRepository.findByUsername(data.username);
    if (existingUsername) {
      throw new Error('Username already taken');
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create account
    const account = await AccountRepository.create({
      email: data.email,
      username: data.username,
      passwordHash,
      role: data.role,
      fullName: data.fullName,
    });

    // Generate tokens
    const accessToken = signToken({ accountId: account.id, role: account.role });

    // Create refresh token session
    const refreshToken = signToken({ accountId: account.id, role: account.role });
    
    // In production, store refresh token in Session table
    // For now, return both tokens

    return {
      account: {
        id: account.id,
        email: account.email,
        username: account.username,
        role: account.role,
        isVerified: account.isVerified,
      },
      accessToken,
      refreshToken,
    };
  },

  async login(email: string, password: string) {
    const account = await AccountRepository.findByEmail(email);
    if (!account) {
      throw new Error('Invalid credentials');
    }

    const isValid = await verifyPassword(account.passwordHash, password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = signToken({ accountId: account.id, role: account.role });
    const refreshToken = signToken({ accountId: account.id, role: account.role });

    return {
      account: {
        id: account.id,
        email: account.email,
        username: account.username,
        role: account.role,
        isVerified: account.isVerified,
      },
      accessToken,
      refreshToken,
    };
  },

  async getMe(accountId: string) {
    const account = await AccountRepository.findById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }

    return {
      id: account.id,
      email: account.email,
      username: account.username,
      role: account.role,
      isVerified: account.isVerified,
      profile: account.userProfile || account.companyProfile,
    };
  },
};