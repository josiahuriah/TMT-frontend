"use client";

import React, { forwardRef } from "react";
import { addDays, format, differenceInDays, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const DatePickerWithRange = forwardRef(({ className, value, onChange }, ref) => {
  const today = new Date();
  const date = value || { from: today, to: addDays(today, 10) };

  const handleSelect = (selectedRange) => {
    if (!selectedRange?.from) return;

    let fromDate = selectedRange.from;
    let toDate = selectedRange.to;

    if (isBefore(fromDate, today)) fromDate = today;
    if (toDate && isBefore(toDate, today)) toDate = undefined;

    const updatedRange = { from: fromDate, to: toDate };
    onChange(updatedRange);

    if (updatedRange.from && updatedRange.to) {
      const days = differenceInDays(updatedRange.to, updatedRange.from);
      console.log(`Selected range: ${format(updatedRange.from, "LLL dd, y")} - ${format(updatedRange.to, "LLL dd, y")}`);
      console.log(`Total days: ${days}`);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal min-h-[4.5rem] text-base px-5",
              !date && "text-muted-foreground"
            )}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Date picker button clicked");
            }}
          >
            <CalendarIcon className="mr-3 h-5 w-5" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          side="bottom"
          align="start"
          sideOffset={8}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={{ before: today }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

DatePickerWithRange.displayName = "DatePickerWithRange";