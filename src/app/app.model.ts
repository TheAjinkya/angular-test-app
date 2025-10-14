export interface Server {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'maintenance';
}

export interface RebootSchedule {
    serverId: string;
    scheduledAt: Date;
}
