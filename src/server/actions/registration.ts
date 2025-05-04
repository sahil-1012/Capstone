"use server"
import { IRegistrationFormValues } from "@/app/student/group-registration/page";
import { getDB } from "@/lib/db"
import bcrypt from "bcryptjs";

export const handleRegistration = async (formData: IRegistrationFormValues) => {
    try {
        const db = await getDB();
        const studentsCol = db.collection('students');
        const groupsCol = db.collection('groups');
        const defaultPassword = await bcrypt.hash('Test@123', 10);

        const existing = await studentsCol.find({
            $or: formData.members.flatMap(member => ([
                { studentId: member.studentId }, { roll: member.roll }, { officialEmailId: member.officialEmailId }
            ]))
        }).toArray();

        if (existing.length) return { success: false, message: '⚠️ One or more students with the same email ID or roll number already exist.' };

        const insertedStudents = await studentsCol.insertMany(formData.members.map(member => ({
            studentId: member.studentId, name: member.name, roll: member.roll, officialEmailId: member.officialEmailId,
            panel: member.panel, domains: member.domains, password: defaultPassword,
            createdAt: new Date()
        })));

        const memberIds = Object.values(insertedStudents.insertedIds);
        const groupRes = await groupsCol.insertOne({ projects: formData.projects.map(project => ({ ...project, status: 'Pending' })), memberIds, groupStatus: 'Pending', createdAt: new Date() });
        return { success: !!groupRes.insertedId };

    } catch (err) {
        console.error('Registration error:', err)
        return { success: false }
    }
};