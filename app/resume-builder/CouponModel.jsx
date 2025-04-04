"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCouponStore } from "../store/useCouponStore";
import Link from "next/link";

export const CouponModal = ({ open, onClose, onSubmit }) => {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    coupon,
    expiry,
    applyCoupon: storeCoupon,
    isValid,
  } = useCouponStore();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(code);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Coupon Code</DialogTitle>
          <DialogDescription className="space-y-2">
            Your exclusive coupon code was sent to your welcome email. Please
            check your inbox and copy it here.
            <br />
            <Link href="/pricing" className="text-primary mt-5 hover:underline">
              Don't have a coupon? Upgrade your plan
            </Link>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="coupon-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. WELCOME100"
              className="col-span-4"
              autoFocus
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!code || isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Applying...
              </>
            ) : (
              "Apply & Download"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
