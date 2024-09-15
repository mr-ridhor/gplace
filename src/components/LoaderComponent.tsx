import { cn } from "@/lib/utils";
import { LuLoader } from "react-icons/lu";
import React, { FC } from "react";

interface LoaderComponentProps {
  className?: string;
}
const LoaderComponent: FC<LoaderComponentProps> = ({ className }) => {
  return <LuLoader className={cn("w-6 h-6 animate-spin", className)} />;
};

export default LoaderComponent;
