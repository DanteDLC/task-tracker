import { Schema, model, models } from "mongoose";

const ActivitySchema = new Schema({
    activity: [String]
});

export const Activity = models.Activity || model("Activity", ActivitySchema, "Activities");
