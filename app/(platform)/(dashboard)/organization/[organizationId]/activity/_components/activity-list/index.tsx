import ActivityItem from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const ActivityList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: { orgId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center">
        No activity found inside this organization.
      </p>
      {auditLogs.map((log) => (
        <ActivityItem data={log} key={log.id} />
      ))}
    </ol>
  );
};

ActivityList.Sekeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};

export default ActivityList;
