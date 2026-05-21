import React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("max-w-7xl mx-auto w-full px-4 lg:px-0", className)}>
      {children}
    </div>
  );
};

export default Container;