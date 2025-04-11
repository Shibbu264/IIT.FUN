import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Ui/Button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Check } from "lucide-react";

interface SocialBoxProps {
    variant: "not-connected" | "connected" | "active-not-connected" | string;
    title: string;
    description: string;
    points: number;
    buttonText?: string|null;
    icon: React.ReactNode;
    onClick?:()=>void;
}

const SocialBox: React.FC<SocialBoxProps> = ({ variant, title, description, points, buttonText, icon,onClick }) => {
    const isMobile = useIsMobile();
    const isConnected = () => variant === "connected" || variant === "active-not-connected";
    const getButtonText = () => {
        switch (variant) {
            case "connected":
                return "Connected";
            case "active-not-connected":
                return "Connect again";
            case "not-connected":
                return "Connect";
            default:
                return null;
        }
    };
    return (
        <div
            className={cn(
                "p-4 rounded-2xl w-64",
                "text-primaryWhite bg-primaryBlack",
                isConnected()?"border-primaryGreen shadow-custom   border":"border-secondaryBlack"
            )}
        >
            <div className="flex justify-between items-center max-md:items-start mb-2">
                {React.cloneElement(icon as React.ReactElement<any>, { className: "w-7 h-7 bg-gray" })}
                <span className={cn("text-lg", isConnected() ? "text-foreground" : "text-secondaryGray")}>
                    <span className="flex gap-1 items-center">
                        {points}
                        {isConnected() && <Check className="text-primaryGreen" />}
                    </span>
                    points</span>
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-secondaryGray max-md:hidden min-h-[85px] text-lg mb-4">{description}</p>
            <Button
                onClick={onClick}
                size={isMobile ? "default" : "lg"}
                variant={variant=="connected"?"disabled":"secondary"}
                className={cn(
                    "w-full py-2 max-md:mt-4 rounded-lg font-semibold text-center",
                )}
            >
                {buttonText?buttonText:getButtonText()}
            </Button>
        </div>
    );
};

export default SocialBox;