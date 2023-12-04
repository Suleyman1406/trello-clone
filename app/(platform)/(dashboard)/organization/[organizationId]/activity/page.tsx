import React, { Suspense } from "react";
import Info from "../_components/info";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/activity-list";
import { checkSubscription } from "@/lib/subscription";

const ActivityPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <Suspense fallback={<ActivityList.Sekeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
