import { AuditLog } from "@prisma/client";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { generateLogMessage } from "@/lib/generate-log-message";
import { format } from "date-fns";

interface IActivityItemProps {
  data: AuditLog;
}
const ActivityItem = ({ data }: IActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>
          <span className="ml-1">{generateLogMessage(data)}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;
