export class UploadFile {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();

    constructor(file: File) {
    }
}
