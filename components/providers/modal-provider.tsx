"use client";

import { useEffect, useState } from "react";

import CardModal from "@/components/modals/card-modal";
import ProModal from "../modals/pro-modal";

export const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ProModal />
      <CardModal />
    </>
  );
};
