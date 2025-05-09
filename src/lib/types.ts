export type folderData = {
    id: number,
    org_id: number,
    uploader: string,
    name: string,
    parent_folder_id: number | null,
    created_at: string
}

export type fileData = {
    id: number,
    orgId: number,
    uploader: string,
    name: string,
    parent_folder_id: number | null,
    created_at: string,
    type: string,
    size: number
}