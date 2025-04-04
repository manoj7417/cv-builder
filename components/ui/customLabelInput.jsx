import { cn } from "@/lib/utils";
import React from "react";

function CustomLabelInput({ className, children, ...props }) {
  return (
    <input
      className={cn(
        "focus:outline-none w-full bg-transparent  border-b-2 border-blue-900 text-2xl font-bold text-black",
        className
      )}
      {...props}
      type="text"
    />
  );
}

export default CustomLabelInput;
