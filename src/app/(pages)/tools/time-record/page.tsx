import { getActivities, initiateActivity } from "@/actions/activity";
import TimeRecord from "@/components/timeRecord";
import React from "react";

const page = async () => {
  const activities = await getActivities();
  return (
    <div>
      <TimeRecord activities={activities} />
    </div>
  );
};

export default page;
