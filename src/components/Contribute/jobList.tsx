import { useEffect, useState, useRef } from "react";
import { TailSpin } from "react-loader-spinner";
import { Button } from "@/components/Ui/Button";

interface Job {
  id: number;
  title: string;
  description: string;
  amount: number;
  unit: string;
  deadline: string;
  image: string;
  Link: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const bountiesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/get-bounties");
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error("Expected an array but got:", data);
          setJobs([]); 
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
        setJobs([]); 
      }
    };
  
    fetchJobs();
  }, []);

  const scrollToBounties = () => {
    bountiesRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowButton(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const bountiesOffset = bountiesRef.current?.offsetTop ?? 0;

      // Show the button if the user scrolls back up above the bounties section
      if (scrollTop + viewportHeight < scrollHeight - 100) {
        setShowButton(true);
      } else if (scrollTop + viewportHeight >= bountiesOffset) {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1" visible={true} />
      </div>
    );
  }

  return (
    <div className="bg-primaryBlack w-full min-h-screen p-4 sm:p-6 mt-14 relative">
      {/* Floating Button */}
      {showButton && (
        <Button
          variant="outline"
          className="fixed bottom-auto lg:bottom-1 left-1/2 transform -translate-x-1/2 p-4 rounded-full shadow-lg bg-primaryBlack hover:scale-[1.05] transition-opacity duration-300"
          onClick={scrollToBounties}
        >
          ↓
        </Button>
      )}

      {/* Bounties Section */}
      <h1 className="text-white text-lg sm:text-xl font-bold mb-4 mt-12">All Open</h1>
      <div ref={bountiesRef} className="space-y-4">
        {jobs.map((job) => (
          <a href={job.Link} target="_blank" rel="noopener noreferrer"
            key={job.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-900 text-white p-4 sm:p-6 md:p-8 border border-lime-500 hover:bg-gray-800 transition cursor-pointer"
          >
            {/* Left Section */}
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <img src={job.image} alt={job.title} className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-sm sm:text-base">
                  <span>{job.title}</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">{job.description}</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="text-right flex items-center space-x-2">
              <p className="font-semibold text-sm sm:text-base">{job.amount}</p>
              <p className="text-xs sm:text-sm text-gray-400">{job.unit}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default JobList;
