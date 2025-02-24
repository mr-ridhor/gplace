import ActivityLog from "../models/ActivityLog";

export const createActivityLog = async (
    action: string,
    resource: string,
    details: string
) => {
    try {
        const logEntry = await ActivityLog.create({
            action,
            resource,
            details,
        });

        return logEntry;
    } catch (error) {
        console.error("Error creating activity log:", error);
        return null;
    }
};