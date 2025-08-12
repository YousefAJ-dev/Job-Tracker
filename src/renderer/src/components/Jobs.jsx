import { useState } from "react";

import AddJob from "./AddJob";

function Jobs() {

	const [jobs, setJobs] = useState([]);
	const [editingJob, setEditingJob] = useState(null);


	function formatDate(applyDate) {
		const [year, month, day] = applyDate.split('-');

		return `${month}/${day}/${year}`;
	}


	function addJob(newJob) {

		setJobs((prev) => [...prev, newJob]);

	}

	function deleteItem(id) {

		setJobs(prev => prev.filter(job => job.id !== id));

	}

	// This tells addJob that we are editing and send which job we are editing too
	function startEditing(job) {
		setEditingJob(job); // gives it a value, also making it true, whereas null is false
		// passing job we are editing
	}

	function updateItem(updatedJob) {

		// SetJobs updates the job array
		// prev is the previous jobs array up to this point
		// map loops through the each job/object in the 'prev' array
		// job represent each object/job in the array and what to do with it
		// job.id is the id for the object
		// while looping, compare each job's id to see when it matches the job we are updating
		// if it is then update that job to the correct values
		// else keep it unchanged as job
		setJobs(prev => (prev.map(job => (job.id === updatedJob.id ? updatedJob : job))));

		// turn off editing mode
		setEditingJob(null);

	}


	return (
		<div className="flex flex-wrap lg:flex-nowrap w-screen h-11/12 py-15 px-28 gap-8 items-center">
			{/* Left: Job Entry Form */}
			<div className="flex-1 lg:flex-[0_0_375px]">
				{/* Title */}
				<div className="bg-emerald-800 text-white text-center text-3xl font-semibold px-6 py-3 rounded-xl shadow-md mb-6">
					Enter Job
				</div>
				{/* Form */}
				<div className="flex items-center justify-center border-2 border-emerald-600 bg-zinc-600 p-6 rounded-lg shadow-lg">
					{/* Add job form */}
					<AddJob onAddJob={addJob}
						editingJob={editingJob}
						onEdit={updateItem}
					/>
				</div>

			</div>

			{/* Right: Job List */}
			<div className="flex-1 flex flex-col bg-neutral-800 rounded-lg p-5 max-h-full">
				<div className="flex flex-wrap gap-5 overflow-y-auto">
					{jobs.map(job => (
						<div
							key={job.id}
							className="flex flex-col bg-neutral-700 rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.01] transition min-w-[200px]"
						>
							<div className="flex gap-3">
								<div className="flex-[3] px-2">
									<h2 className="text-2xl font-bold text-emerald-400">{job.title}</h2>
									<p className="text-lg font-medium text-gray-300">{job.companyName}</p>
									<p className="text-md text-gray-400">{job.websiteApplied}</p>
									<p className="text-md font-medium text-gray-300">{job.phoneNumber}</p>
									<p className="text-md font-medium text-gray-300">{job.email}</p>
									<p className="text-sm text-gray-400">{formatDate(job.applyDate)}</p>
								</div>

								<div className="flex-[1] px-2 flex flex-col items-center gap-3 justify-center flex-shrink-0">
									<button
										type="button"
										onClick={() => deleteItem(job.id)}
										className="border-2 border-red-800 rounded-md px-4 py-1 font-semibold hover:bg-red-400 active:scale-95"
									>
										Delete
									</button>
									<button
										type="button"
										onClick={() => startEditing(job)}
										className="border-2 border-sky-800 rounded-md px-4 py-1 font-semibold hover:bg-sky-300 active:scale-95"
									>
										Edit
									</button>
								</div>
							</div>

							<div className="p-2 mb-2">
								<p className="text-sm font-medium text-gray-400">{job.comments}</p>
							</div>

							<div>
								<p
									className={`py-1 text-center text-sm font-semibold mt-2 rounded-md 
                						${job.jobStatus.toLowerCase() === "accepted"
											? "bg-emerald-400"
											: job.jobStatus.toLowerCase() === "pending"
												? "bg-yellow-400"
												: job.jobStatus.toLowerCase() === "rejected"
													? "bg-red-400"
													: "bg-sky-400"
										}`}
								>
									{job.jobStatus}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>


	);

}

export default Jobs