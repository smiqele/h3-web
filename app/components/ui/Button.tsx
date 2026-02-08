"use client";

interface ButtonProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "black" | "mint" | "silver" | "offwhite";
  className?: string;
  onClick?: () => void;
}

const sizeMap = {
  xs: "h-8 px-3 body-mono-strong-sm",
  sm: "h-10 px-4 body-mono-strong-sm",
  md: "h-12 px-5 body-mono-strong-md",
  lg: "h-14 px-6 body-mono-strong-md",
  xl: "h-16 px-7 body-mono-strong-lg",
};

const colorMap = {
  black: "bg-h3-black text-white hover:bg-h3-mint hover:text-h3-black",
  mint: "bg-h3-mint text-h3-black hover:bg-black hover:text-white",
  silver: "bg-h3-silver text-h3-black hover:bg-h3-black hover:text-white",
  offwhite:
    "bg-h3-off-white text-h3-black hover:bg-h3-black hover:text-h3-white",
};

export function Button({
  children,
  size = "md",
  color = "black",
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`w-fit rounded-md inline-flex justify-start items-center gap-2.5 cursor-pointer
                  transition-colors ${sizeMap[size]} ${colorMap[color]} ${className}`}
    >
      <span className="-translate-y-[1px]">{children}</span>
    </div>
  );
}
