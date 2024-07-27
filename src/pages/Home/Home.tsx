const jobListings = [
  {
    company: "MongoDB",
    position: "Senior UI Engineer",
    location: "NYC / Remote (US)",
    salary: "$118-231K",
    logo: "🍃",
    postedAgo: "4 hours ago",
  },
  {
    company: "Whop",
    position: "Design Engineer",
    location: "Brooklyn / NYC / Remote",
    salary: "Not specified",
    logo: "🔶",
    postedAgo: "3 days ago",
  },
  {
    company: "Luma AI",
    position: "Senior Design Engineer - Web",
    location: "Palo Alto, CA",
    salary: "Not specified",
    logo: "🔷",
    postedAgo: "4 days ago",
  },
  {
    company: "Restream",
    position: "Senior Design Engineer",
    location: "Remote / Europe",
    salary: "Not specified",
    logo: "R",
    postedAgo: "4 days ago",
  },
  {
    company: "Tinder",
    position: "Design Engineer II",
    location: "W. Hollywood / SF",
    salary: "$135-145K",
    logo: "🔥",
    postedAgo: "4 days ago",
  },
];

function Home() {
  return (
    <div className="w-full min-h-screen bg-base-200 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-36">
          <h1 className="text-h1 font-bold mb-1">ds-visualizer</h1>
          <h1 className="text-h5 font-regular mb-2">for the visual learners</h1>
        </header>

        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="bg-base-100 text-small p-2 border border-1-neutral">
              Count · {jobListings.length}
            </div>
          </div>

          <div className="">
            {jobListings.map((job, index) => (
              <div
                key={index}
                className="bg-transparent p-6 border flex items-center mb-2"
              >
                <div className="border w-12 h-12 bg-primary flex items-center justify-center text-white font-bold mr-4">
                  {job.logo}
                </div>
                <div className="flex-grow">
                  <h2 className="font-bold">{job.company}</h2>
                  <p className="text-sm text-gray-600">{job.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{job.location}</p>
                  <p className="text-sm font-semibold">{job.salary}</p>
                </div>
                <div className="ml-4 text-xs text-gray-500">
                  {job.postedAgo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
