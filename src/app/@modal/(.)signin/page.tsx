"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignInForm from "@/modules/auth/ui/components/signin-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("redirect");

  const onSignedIn = () => {
    setIsOpen(false);
    if (callbackURL) {
      router.push(callbackURL);
    } else {
      router.prefetch(document.referrer || "/");
      router.back();
      setTimeout(() => router.refresh(), 200);
    }
  };

  return (
    <Dialog defaultOpen={isOpen} onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <SignInForm onSignedIn={onSignedIn} />
      </DialogContent>
    </Dialog>
  );
};

export default Page;
