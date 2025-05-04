import { getDB } from "@/lib/db";

export const getStudentGroupDetails = async (studentId: string) => {
    try {
        const db = await getDB();
        const studentsCol = db.collection('students');
        const groupsCol = db.collection('groups');

        const student = await studentsCol.findOne({ studentId });
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
