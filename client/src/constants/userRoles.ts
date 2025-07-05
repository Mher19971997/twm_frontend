export enum UserRoles {
    // superAdmin = 'superAdmin',
    admin = 'admin',
    parent = 'parent',
    student = 'student',
    teacher = 'teacher',
}

export const roleLabelsInRussian: { [key in UserRoles]: string } = {
    // superAdmin: 'Супер администратор',
    admin: 'Администратор',
    parent: 'Родитель',
    student: 'Студент',
    teacher: 'Учитель',
};
