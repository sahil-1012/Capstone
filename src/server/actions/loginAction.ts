'use server'

import { getDB } from '@/lib/db'
import { setCookie } from '@/utils/cookie'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string;

export const loginAction = async (userId: string, password: string) => {
    const db = await getDB();

    const isEmployee = userId?.toUpperCase()?.startsWith('E')
    const user = await db.collection(isEmployee ? 'employees' : 'students').findOne({
        [isEmployee ? 'employeeId' : 'studentId']: userId
    });

    if (!user || !user.password) return { success: false, message: 'Invalid employee ID or password' };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { success: false, message: 'Invalid employee ID or password' };

    const token = jwt.sign({ userId: user._id.toString(), [isEmployee ? 'employeeId' : 'studentId']: userId }, JWT_SECRET, { expiresIn: '7d' });

    await setCookie('authToken', { token }, 'token');
    return { success: true, message: 'Login successful', type: isEmployee ? 'employee' : 'student' }

}