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


export const formatDate = (date: string) =>{
    return new Date(date).toLocaleString('en-GB', { 
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}

export const stripFileType = (filename: string): string => {
    return filename.substring(0, filename.lastIndexOf('.')) || filename;
}