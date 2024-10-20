import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(({ ...props }, ref) => {
  const { className } = props;
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        " relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props} // Spread all remaining props
    />
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("rounded-none h-full w-full", className)}
      {...props} // Spread all remaining props
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center bg-muted",
        className
      )}
      {...props} // Spread all remaining props
    />
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
