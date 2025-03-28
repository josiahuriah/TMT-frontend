// src/components/TestPopover.jsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TestPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" onClick={() => console.log("Test button clicked")}>
          Open Popover
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>This is a test popover!</p>
      </PopoverContent>
    </Popover>
  );
}