import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | null;
  onSelect: (date: Date | null) => void;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  className?: string;
}

export const DatePicker = ({ 
  date, 
  onSelect, 
  placeholder = "Pick a date",
  disabled,
  className 
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-input border-input-border hover:bg-secondary",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-popover border-card-border shadow-medium" align="start">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={(selectedDate) => onSelect(selectedDate || null)}
          disabled={disabled}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
};