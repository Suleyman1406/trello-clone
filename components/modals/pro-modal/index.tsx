"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import useProModal from "@/hooks/use-pro-modal";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const ProModal = () => {
  const { onClose, isOpen } = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onUpgradde = () => {
    execute({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src={"/hero.svg"} alt="Hero" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to DadaRello Pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of DadaRello
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited Boards</li>
              <li>Advanced Checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            onClick={onUpgradde}
            disabled={isLoading}
            className="w-full"
            variant="primary"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
