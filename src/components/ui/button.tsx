import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:pointer-events-none disabled:opacity-50",{
 variants:{variant:{default:"bg-blue-500 text-white hover:bg-blue-400",secondary:"border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]",ghost:"text-white/65 hover:bg-white/[0.06] hover:text-white",link:"text-blue-300 underline-offset-4 hover:underline"},size:{default:"h-11 px-5",sm:"h-9 px-4 text-xs",lg:"h-12 px-6",icon:"size-10"}},
 defaultVariants:{variant:"default",size:"default"}
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants>{asChild?:boolean}
export const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant,size,asChild=false,...props},ref)=>{
 const Comp=asChild?Slot:"button";
 return <Comp ref={ref} className={cn(buttonVariants({variant,size,className}))} {...props}/>;
});
Button.displayName="Button";
