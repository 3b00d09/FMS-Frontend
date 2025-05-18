export type organisation = {
    id: string,
    name: string,
    storageUsed: number,
    memberCount: number,
}


export type joinedOrganisation = {
    id: string,
    name: string,
    role: string,
    creatorName: string
}

export type folderData = {
    id: number,
    orgId: number,
    uploader: string,
    name: string,
    parentFolderId: number | null,
    createdAt: string, 
    size: number,
}

export type fileData = {
    id: number,
    orgId: number,
    uploader: string,
    name: string,
    parentFolderId: number | null,
    createdAt: string,
    type: string,
    size: number
}

export type inviteData = {
    id: number,
    orgId: number,
    orgOwner: string,
    orgName: string,
    invitedAt: string,
}

export type organisationMember = {
    username: string,
    role: string,
    joinedAt: string,
}

export type notificationData = {
    id: number,
    orgName: string,
    actorName: string,
    message: string,
    payloadName: string,
    isRead: boolean,
    createdAt: string,
    notifType: string,
}