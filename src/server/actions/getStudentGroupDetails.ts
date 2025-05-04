import { getDB } from "@/lib/db";
import { getCookie } from '../../utils/cookie';

export const getStudentGroupDetails = async (studentId: string) => {
    try {
    const token = jwt.sign({ userId: user._id.toString(), [isEmployee ? 'employeeId' : 'studentId']: userId }, JWT_SECRET, { expiresIn: '7d' });

        const studentIdToken = await getCookie('authToken');
        get user_id from the toe n
        const db = await getDB();
        const studentsCol = db.collection('students');
        const groupsCol = db.collection('groups');

        const student = await studentsCol.findbyId(user_id);
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
