import { getDB } from "@/lib/db";
import { getCookie } from '../../utils/cookie';
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const getStudentGroupDetails = async () => {
    try {

        const studentIdToken = await getCookie('authToken');
        if (!studentIdToken) throw new Error('No auth token found');

        const decoded = jwt.verify(studentIdToken, JWT_SECRET) as { userId: string };
        const user_id = decoded.userId;

        const db = await getDB();
        const studentsCol = db.collection('students');
        const groupsCol = db.collection('groups');

        const student = await studentsCol.findOne({ _id: new ObjectId(user_id) });
        if (!student) return { success: false, message: '❌ Student not found.' };

        const group = await groupsCol.findOne({ memberIds: student._id });
        const members = await studentsCol.find({ _id: { $in: group?.memberIds } }).toArray();

        return {
            success: true,
            data: {
                groupStatus: group?.groupStatus,
                projects: group?.projects,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                members: members.map(({ password, ...rest }) => rest)
            }
        };

    } catch (err) {
        console.error('Fetch error:', err);
        return { success: false }
    }
};
