"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardStatus =
  | "default"
  | "limit-exceeded"
  | "not-approached"
  | "locked";

export interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  imageUrl?: string;
  status?: CardStatus;
  pointsNeeded?: number;
  onJoin?: () => void;
  onRSVP?: () => void;
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
}: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-lg">
      <div
        className={`bg-black rounded-lg overflow-hidden relative`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {status === "locked" ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
            <div className="bg-[#c1ff00] rounded-full p-3 mb-2">
              <Lock className="h-6 w-6 text-black" />
            </div>
            <p className="text-white font-bold text-lg">
              Oopsie... No Entry for You! 😔
            </p>
            <p className="text-white">
              You need{" "}
              <span className="text-[#c1ff00] font-bold">{pointsNeeded}</span>{" "}
              more points to unlock access.{" "}
              <span className=" text-black text-lg">
                📈
              </span>{" "}
              Grind More.
            </p>
          </div>
        ) : null}

        <div
          className={cn(
            "p-4 flex flex-row gap-4",
            status === "locked" && "opacity-50 blur-sm"
          )}
        >
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-[#c1ff00] mr-2" />
              <div className="text-white text-sm">
                {time}
                <br />
                {date}
              </div>
            </div>

            <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
            <p className="flex-wrap text-white/80 text-sm mb-4 line-clamp-3">
              {description}
            </p>

            <div className="flex gap-2">
              <button
                onClick={onJoin}
                disabled={status === "locked" || status === "limit-exceeded"}
                className={cn(
                  "px-14 py-2 rounded text-sm font-medium transition-colors",
                  status === "not-approached" &&
                    "text-[#c1ff00] bg-black border-2 border-[#c1ff00] hover:text-black hover:bg-[#c1ff00]",
                  status === "limit-exceeded" &&
                    "bg-zinc-800 text-white hover:bg-zinc-700 cursor-not-allowed ",
                  status === "default" &&
                    "bg-zinc-800 text-white hover:bg-zinc-700",
                  status === "locked" && "pointer-events-none "
                )}
              >
                Join Now
              </button>
              <button
                onClick={onRSVP}
                disabled={status === "locked" || status === "not-approached"}
                className={cn(
                  "px-14 py-2 rounded text-sm font-medium transition-colors",
                  status === "not-approached" &&
                    "bg-zinc-800 text-white hover:bg-zinc-700 cursor-not-allowed",
                  status === "limit-exceeded" &&
                    "text-[#c1ff00] bg-black hover:text-black hover:bg-[#c1ff00] border-2 border-[#c1ff00]",
                  status === "default" &&
                    "bg-zinc-800 text-white hover:bg-zinc-700",
                  status === "locked" && "pointer-events-none"
                )}
              >
                RSVP
              </button>
            </div>
          </div>

          <div className="w-[120px] h-[120px] bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
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
