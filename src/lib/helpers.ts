// takes in bytes and formats it in a user-friendly way
// useful as the database stores sizes in bytes
export const formatSize = (bytes: number) => {
    if (bytes < 1024) {
        return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
        const kb = Math.round(bytes / 1024);
        const kbit = Math.round(bytes * 8 / 1024);
        return `${kb} KB (${kbit} Kb)`;
    }
    return `${Math.round(bytes / (1024 * 1024))} MB`;
}


// formats dates in user-friendly way
export const formatDate = (date: string) =>{
    return new Date(date).toLocaleString('en-GB', { 
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// returns the type of a file
export const stripFileType = (filename: string): string => {
    return filename.substring(0, filename.lastIndexOf('.')) || filename;
}
export const allowedFileTypes = [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
];

export const maxFileSize = 10 * 1024 * 1024;

// characters that shouldn't be included in file or folder names as they will cause a conflict with the OS when stored
export const invalidChars = /[<>:"/\\|?*]/;