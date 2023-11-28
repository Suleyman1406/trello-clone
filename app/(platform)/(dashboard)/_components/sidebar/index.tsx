"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import Link from "next/link";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Organization } from "@/types";
import NavItem from "../nav-item";

interface ISidebarProps {
  storageKey?: string;
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: ISidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrganization } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedMemberships } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], value: string) => {
      if (expanded[value]) {
        acc.push(value);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !expanded[id],
    }));
  };

  if (
    !isLoadedOrganization ||
    !isLoadedMemberships ||
    userMemberships.isLoading
  )
    return (
      <>
        <Skeleton />
      </>
    );

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            onExpand={onExpand}
            key={organization.id}
            organization={organization as Organization}
            isExpanded={expanded[organization.id]}
            isActive={organization.id === activeOrganization?.id}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Sidebar;
