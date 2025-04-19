"use server"

import { connectToDatabase } from "@/lib/mongoose";
import { Activity } from "@/models/Activities";

export const getActivities = async () => {
    await connectToDatabase();
    const activities = await Activity.find().select("activity").lean();
    if (!activities) return { succes: false, data: [] }
    return activities[0].activity;
}

export const initiateActivity = async () => {
    await connectToDatabase();
    const activity = await Activity.create({
        activity: [
            "Edit Video",
            "Outreach"
        ]
    })
    return activity;
}

export const addActivity = async (activity: string) => {
    await connectToDatabase();
    const newActivity = await Activity.find({});
    newActivity.push(activity);
}