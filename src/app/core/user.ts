export interface Roles {
    student?: boolean;
    teacher?: boolean;
    guardian?: boolean;
    principal?: boolean;
    lessonPlanner?: boolean;
    admin?: boolean;
}

export interface Rewards {
    points?: number;
    coins?: number;
    cards?: string;
}
// might need interface in futer
/* export interface ReportCard {

} */

export interface Teacher {
    students?: string[];

}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    currentClass?: string; // maybe a student can take more then one class
    // reportCard?: string;
    // points?: string;
    // stuff?: string;
    currentLesson?: number; // current lesson will be set by the teacher or guardian
    roles: Roles; // might take this out and create separate userstype extendending from user
}
