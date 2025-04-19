"use client";

import { useState } from "react";
import { format, differenceInSeconds } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Square, Plus, Trash2 } from "lucide-react";

// Predefined activities
const PREDEFINED_ACTIVITIES = [
  "Following and unfollowing accounts",
  "Sending welcome messages and follow-ups",
  "Writing Guide book",
  "Sending follow-up to Bali",
  "Sending emails to new prospects",
  "Short break",
];

interface TimeRecord {
  id: string;
  date: string;
  activity: string;
  timeStarted: string;
  timeOut: stringm;
  totalHours: number;
}

export default function TimeTracker() {
  const [records, setRecords] = useState<TimeRecord[]>([]);
  const [currentActivity, setCurrentActivity] = useState<string>("");
  const [customActivity, setCustomActivity] = useState<string>("");
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Start time tracking
  const startTracking = () => {
    const activity = showCustomInput ? customActivity : currentActivity;
    if (!activity) return;

    setIsTracking(true);
    setStartTime(new Date());
  };

  // Stop time tracking and save record
  const stopTracking = () => {
    if (!startTime) return;

    const endTime = new Date();
    const diffInSeconds = differenceInSeconds(endTime, startTime);
    const totalHours = Number.parseFloat((diffInSeconds / 3600).toFixed(2));

    const newRecord: TimeRecord = {
      id: Date.now().toString(),
      date: format(new Date(), "dd/MM/yy"),
      activity: showCustomInput ? customActivity : currentActivity,
      timeStarted: format(startTime, "h:mm a"),
      timeOut: format(endTime, "h:mm a"),
      totalHours,
    };

    setRecords([...records, newRecord]);
    setIsTracking(false);
    setStartTime(null);

    // Reset custom activity if using it
    if (showCustomInput) {
      setCustomActivity("");
    }
  };

  // Delete a record
  const deleteRecord = (id: string) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  // Handle activity selection
  const handleActivityChange = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true);
      setCurrentActivity("");
    } else {
      setShowCustomInput(false);
      setCurrentActivity(value);
    }
  };

  // Calculate total hours for all records
  const totalHoursToday = records
    .filter((record) => record.date === format(new Date(), "dd/MM/yy"))
    .reduce((sum, record) => sum + record.totalHours, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Time Tracker</h1>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Track New Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="activity">Select Activity</Label>
              <Select onValueChange={handleActivityChange}>
                <SelectTrigger id="activity">
                  <SelectValue placeholder="Select an activity" />
                </SelectTrigger>
                <SelectContent>
                  {PREDEFINED_ACTIVITIES.map((activity) => (
                    <SelectItem key={activity} value={activity}>
                      {activity}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">
                    <span className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" />
                      Custom Activity
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showCustomInput && (
              <div className="space-y-2">
                <Label htmlFor="custom-activity">Custom Activity</Label>
                <Input
                  id="custom-activity"
                  placeholder="Enter custom activity"
                  value={customActivity}
                  onChange={(e) => setCustomActivity(e.target.value)}
                />
              </div>
            )}

            <Button
              className="mt-4 w-full"
              onClick={isTracking ? stopTracking : startTracking}
              disabled={
                (!currentActivity && !customActivity) ||
                (showCustomInput && !customActivity)
              }
            >
              {isTracking ? (
                <span className="flex items-center">
                  <Square className="mr-2 h-4 w-4" /> Stop Tracking
                </span>
              ) : (
                <span className="flex items-center">
                  <Play className="mr-2 h-4 w-4" /> Start Tracking
                </span>
              )}
            </Button>

            {isTracking && startTime && (
              <div className="mt-2 text-center">
                <p className="text-muted-foreground text-sm">
                  Tracking since {format(startTime, "h:mm:ss a")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Time Records</CardTitle>
            <div className="text-muted-foreground text-sm">
              Total hours today:{" "}
              <span className="font-bold">{totalHoursToday}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Time Started</TableHead>
                    <TableHead>Time Out</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-muted-foreground py-4 text-center"
                      >
                        No time records yet. Start tracking to add records.
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.activity}</TableCell>
                        <TableCell>{record.timeStarted}</TableCell>
                        <TableCell>{record.timeOut}</TableCell>
                        <TableCell>{record.totalHours.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteRecord(record.id)}
                            aria-label="Delete record"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
