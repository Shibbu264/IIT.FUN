import Image from "next/image";

const JobList = () => {
  const jobs = [
    { id: 1, title: "Full Stack Developer Needed", company: "Zo house", price: "1,250", currency: "USDC" },
    { id: 2, title: "Full Stack Developer Needed", company: "Zo house", price: "1,250", currency: "USDC" },
    { id: 3, title: "Full Stack Developer Needed", company: "Zo house", price: "1,250", currency: "USDC" },
    { id: 4, title: "Full Stack Developer Needed", company: "Zo house", price: "1,250", currency: "USDC" },
    { id: 5, title: "Full Stack Developer Needed", company: "Zo house", price: "1,250", currency: "USDC" },
    { id: 6, title: "Full Stack Developer Needed", company: "Zo house", price: "1,250", currency: "USDC" },
    { id: 7, title: "Full Stack Developer Needed", company: "Zo house", price: "1,250", currency: "USDC" },
  ];

  return (
    <div className="bg-black w-full min-h-screen p-4 sm:p-6 mt-14">
      <h1 className="text-white text-lg sm:text-xl font-bold mb-4 mt-6">All Open</h1>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-900 text-white p-4 sm:p-6 md:p-8 border border-lime-500 hover:bg-gray-800 transition cursor-pointer"
          >
            {/* Left Section */}
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              {/* Placeholder Image */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700  flex-shrink-0"></div>
              {/* Job Info */}
              <div>
                <h2 className="font-semibold text-sm sm:text-base">{job.title}</h2>
                <p className="text-xs sm:text-sm text-gray-400">{job.company}</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="text-right">
              <p className="font-semibold text-sm sm:text-base">{job.price}</p>
              <p className="text-xs sm:text-sm text-gray-400">{job.currency}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
