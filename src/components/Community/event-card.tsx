"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../Ui/Button";

export type CardStatus =
  | "default"
  | "limit-exceeded"
  | "not-approached"
  | "locked"
  | "ended";

export interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  type: "upcoming" | "registered" | "attended";
  imageUrl?: string;
  status?: CardStatus;
  pointsNeeded?: number;
  onJoin?: () => void;
  onRSVP?: () => void;
  className?: string;
  onRegister?: () => void;
}

export default function EventCard({
  title,
  description,
  date,
  time,
  imageUrl = "/placeholder.svg?height=150&width=150",
  status = "default",
  pointsNeeded = 100,
  onJoin,
  onRSVP,
  type,
  onRegister,
  className,
}: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={cn("w-full max-w-lg md:max-w-xl lg:max-w-2xl", className)}>
      <div
        className="bg-black rounded-lg overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {status === "locked" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
            <div className="bg-[#c1ff00] rounded-full p-3 mb-2">
              <Lock className="h-6 w-6 text-black" />
            </div>
            <p className="text-white font-bold text-lg">
              Oopsie... No Entry for You! 😔
            </p>
            <p className="text-white text-sm sm:text-base">
              You need{" "}
              <span className="text-[#c1ff00] font-bold">{pointsNeeded}</span>{" "}
              more points to unlock access.
              <span className="text-black text-lg">📈</span> Grind More.
            </p>
          </div>
        )}

        <div
          className={cn(
            "p-4 flex flex-col md:flex-row gap-4",
            status === "locked" && "opacity-50 blur-sm"
          )}
        >
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-[#c1ff00] mr-2" />
              <div className="text-white text-sm sm:text-base">
                {time}
                <br />
                {date}
              </div>
            </div>

            <h2 className="text-white text-lg sm:text-xl font-bold mb-2">
              {title}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-4 line-clamp-3">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row w-full gap-2">
              {type === "upcoming" ? (
                <Button
                  onClick={onRegister}
                  size="lg"
                  className="w-full sm:w-1/2"
                >
                  Register
                </Button>
              ) : (
                <>
                  <Button
                    onClick={onJoin}
                    disabled={
                      status === "locked" || status === "limit-exceeded"
                    }
                    variant={
                      status === "not-approached"
                        ? "active"
                        : status === "limit-exceeded"
                        ? "passive"
                        : "default"
                    }
                    className={cn(
                      "px-10 sm:px-14 py-2 rounded text-sm font-medium transition-colors",
                      status === "locked" && "pointer-events-none"
                    )}
                  >
                    Join Now
                  </Button>
                  <Button
                    onClick={onRSVP}
                    disabled={
                      status === "locked" ||
                      status === "ended" ||
                      type === "attended"
                    }
                    variant={
                      status === "not-approached"
                        ? "passive"
                        : status === "limit-exceeded"
                        ? "active"
                        : "default"
                    }
                    className={cn(
                      "px-10 sm:px-14 py-2 rounded text-sm font-medium transition-colors",
                      status === "locked" && "pointer-events-none"
                    )}
                  >
                    RSVP
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="w-full sm:w-[120px] h-[120px] bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Event graphic"
                width={500}
                height={220}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
