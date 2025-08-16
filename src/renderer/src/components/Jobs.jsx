import { useState } from "react";

import AddJob from "./AddJob";

function Jobs() {

	const [jobs, setJobs] = useState([]);
	const [editingJob, setEditingJob] = useState(null);

	const [searchTerm, setSearchTerm] = useState("");
	const [isFocused, setIsFocused] = useState(false);



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

	function filterResults(isFocused, searchTerm) {
		if (!isFocused) { return jobs }



		searchTerm = searchTerm.toLowerCase();

		console.log(searchTerm);

		/*
		Returning Values with .filter()
		---------------------------------------
		When you use .filter() in JavaScript, it:
		Iterates over every element in the array.
		Runs your callback for each element.
		Keeps the element only if the callback returns a truthy value (true).
		Produces a new array — it never changes the original.
		If you don’t store or return that new array, it just disappears.

		In your filterResults function, there are two separate “return” moments:
		------------------------------------------------------------------------
		1️⃣ Return inside the .filter() callback
		2️⃣ Return from the outer function

		*/
		const filteredJobs = jobs.filter(job => {

			//Inner return = “Should I keep this item in the filtered list?”
			return job.title.toLowerCase().includes(searchTerm) ||
				job.companyName.toLowerCase().includes(searchTerm) ||
				job.jobStatus.toLowerCase().includes(searchTerm) ||
				job.applyDate.toLowerCase().includes(searchTerm) ||
				job.websiteApplied.toLowerCase().includes(searchTerm) ||
				job.phoneNumber.toLowerCase().includes(searchTerm) ||
				job.email.toLowerCase().includes(searchTerm);
		});

		console.log(filteredJobs);

		//Outer return = “Here’s the final filtered list for you to use.”
		return filteredJobs; // ✅ This is the outer return
	}

	function sortJobs() {

	}

	/*
	{isFocused &&
					<ul className="flex flex-col absolute top-full mt-2 bg-neutral-700 rounded-lg shadow-lg w-full">
						{jobs.filter(job => {
							const term = searchTerm.toLowerCase();

							const matches = job.title.toLowerCase().includes(term) ||
								job.companyName.toLowerCase().includes(term) ||
								job.jobStatus.toLowerCase().includes(term) ||
								job.applyDate.toLowerCase().includes(term) ||
								job.websiteApplied.toLowerCase().includes(term) ||
								job.phoneNumber.toLowerCase().includes(term) ||
								job.email.toLowerCase().includes(term);


							return matches;

						}).map((searchItem) =>
							<li key={searchItem.id} className="px-4 py-2 hover:bg-neutral-800">

								{searchItem.title} - {searchItem.companyName}
							</li>
						)}
					</ul>
				}*/

	return (
		<>
			<div className="flex flex-col justify-self-center -translate-y-18">
				<input type="text" placeholder="Search jobs"
					value={searchTerm} className="bg-neutral-600 w-md px-6 py-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
					onChange={e => setSearchTerm(e.target.value)}
					onFocus={() => setIsFocused(true)}
				/>
			</div>
			<div className="flex flex-wrap lg:flex-nowrap w-screen h-[80%] py-15 px-28 gap-8 items-center">
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
				<div className="flex-1 flex flex-col">
					<div className="flex justify-center">
						<select className="p-3" >
							<option className="text-black" value="">Sort By</option>
							<option className="text-black" value="AlphabetAZ">Alphabetical (A-Z)</option>
							<option className="text-black" value="AlphabetZA">Alphabetical (Z-A)</option>
							<option className="text-black" value="Most Recent">Most Recent</option>
							<option className="text-black" value="Least Recent">Least Recent</option>
						</select>
					</div>
					<div className="bg-neutral-800 rounded-lg p-5 max-h-full">
						<ul className="flex flex-wrap gap-5 overflow-y-auto">
							{filterResults(isFocused, searchTerm).map(job => (
								<li
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
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>


	);

}

export default Jobs