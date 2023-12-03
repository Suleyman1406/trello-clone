import React, { Suspense } from "react";
import Info from "../_components/info";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/activity-list";

const ActivityPage = () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="mt-2" />
      <Suspense fallback={<ActivityList.Sekeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
