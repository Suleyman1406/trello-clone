"use client";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import useProModal from "@/hooks/use-pro-modal";
import { error } from "console";
import React from "react";
import { toast } from "sonner";

interface ISubscriptionButtonProps {
  isPro: boolean;
}
const SubscriptionButton = ({ isPro }: ISubscriptionButtonProps) => {
  const { onOpen } = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      onOpen();
    }
  };

  return (
    <Button variant="primary" disabled={isLoading} onClick={onClick}>
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};

export default SubscriptionButton;
