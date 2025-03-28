"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Popover({ children, ...props }) {
  const [open, setOpen] = useState(false);
  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(newOpen) => {
        console.log("Root onOpenChange:", newOpen);
        setOpen(newOpen);
      }}
      {...props}
    >
      {children}
    </PopoverPrimitive.Root>
  );
}

export const PopoverTrigger = forwardRef(({ className, asChild = false, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    asChild={asChild}
    data-slot="popover-trigger"
    className={cn(className)}
    {...props}
  />
));
PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverContent = forwardRef(
  ({ className, align = "center", sideOffset = 4, side = "top", ...props }, ref) => (
    <PopoverPrimitive.Content
      ref={ref}
      data-slot="popover-content"
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "bg-white text-black z-[1000] w-auto rounded-md border p-4 shadow-md outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "inherit",
        "rental-calendar",
        className
      )}
      {...props}
    />
  )
);
PopoverContent.displayName = "PopoverContent";

export const PopoverAnchor = PopoverPrimitive.Anchor;

// export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };