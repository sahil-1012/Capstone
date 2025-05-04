'use server'

import { getDB } from '@/lib/db'

export const signupAction = async (officialEmailId: string, otp: string | number) => {
    const db = await getDB();
    const existing = await db.collection('students').findOne({ officialEmailId });
    if (existing) return { success: false, message: 'User already exists' };
    if (otp.toString() !== '1012') return { success: false, message: 'Wrong OTP' }
    return { success: true }
};