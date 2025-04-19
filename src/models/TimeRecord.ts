import { Schema, model, models } from "mongoose";

const TimeRecordSchema = new Schema({
    id: String,
    date: String,
    activity: String,
    timeStarted: String,
    timeOut: String,
    totalHours: Number
});

export const TimeRecord = models.TimeRecord || model("TimeRecord", TimeRecordSchema, "TimeRecord");
