import { useState } from "react";

function Jobs() {

	const [companyName, setCompanyName] = useState("");
	const [title, setTitle] = useState("");
	const [applyDate, setApplyDate] = useState("");
	const [jobStatus, setJobStatus] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [websiteApplied, setWebsiteApplied] = useState("");
	const [comments, setComments] = useState("");

	const [jobs, setJobs] = useState([]);

	const [pnErrorMsg, setPnErrorMsg] = useState("");
	const [emailErrorMsg, setEmailErrorMsg] = useState("");

	// State to track which job is expanded; null means none
	const [expandedJob, setExpandedJob] = useState(null);

	function validateEmail(email) {

		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}

	function validatePhoneNumber(phoneNumber) {

		const re = /^\+?[\d\s\-()]{7,15}$/;
		return re.test(phoneNumber);
	}

	function formatDate(applyDate) {
		const [year, month, day] = applyDate.split("-");
		return `${month}/${day}/${year}`;
	}

	function handleJobDetails(e) {
		e.preventDefault(); // prevent form refresh

		if ((title.trim() === "" || companyName.trim() === "" || applyDate.trim() === "" || comments.trim() === "" ||
			jobStatus.trim() === "" || phoneNumber.trim() === "" || email.trim() === "")) {
			return;
		} else if (!validateEmail(email)) {
			setEmailErrorMsg("Please enter a valid email.");
			return;
		} else if (!validatePhoneNumber(phoneNumber)) {
			setPnErrorMsg("Please enter a valid Phone Number.");
			return;
		}

		setJobs([...jobs, { title, companyName, applyDate, jobStatus, phoneNumber, email, websiteApplied, comments }]);

		setCompanyName("");
		setTitle("");
		setApplyDate("");
		setJobStatus("");
		setPhoneNumber("");
		setEmail("");
		setWebsiteApplied("");
		setComments("");
		setPnErrorMsg("");
		setEmailErrorMsg("");

	}

	function deleteItem(index) {

		setJobs(prev => prev.filter((_, i) => i !== index));

	}

	function updateItem(index) {

		/* send to an update form and pre-fill with current data */

	}

	function enlargeItem(index) {

		setExpandedJob(prev => (prev === index ? null : index));

	}

	return (
		<div className="flex flex-col items-center w-screen min-h-screen p-16 max-h-screen overflow-y-auto">
			{/* Title */}
			<div className="w-75 bg-emerald-800 text-white text-center text-3xl font-semibold px-6 py-3 rounded-xl shadow-md mb-6"> Enter Job </div>

			{/* Form */}
			<div className="flex items-center justify-center border-2 border-emerald-600 w-full max-w-md bg-zinc-600 p-6 rounded-lg shadow-lg">
				<form onSubmit={handleJobDetails} className="space-y-4">

					<div className="form-item">
						<label className="block text-sm font-medium text-shadow-lg text-gray-100">Title</label>
						<input required
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
							type="text"
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					</div>

					<div className="form-item">
						<label className="block text-sm font-medium text-shadow-lg text-gray-100">Company</label>
						<input
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
							type="text" required
							value={companyName}
							onChange={e => setCompanyName(e.target.value)}
						/>
					</div>

					<div className="flex gap-4">
						<div className="form-item flex-1">
							<label className="block text-sm font-medium text-shadow-lg text-gray-100">Date Applied</label>
							<input
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-zinc-500 
                 				focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
								type="date" required
								value={applyDate}
								onChange={e => setApplyDate(e.target.value)}
							/>
						</div>

						<div className="form-item flex-1">
							<label className="block text-sm font-medium text-shadow-lg text-gray-100">Status</label>
							<select
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-zinc-500 
                 				focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
								name="jobStatus" required placeholder="Pending, etc"
								value={jobStatus}
								onChange={e => setJobStatus(e.target.value)}>

								<option value="">Select option:</option>
								<option value="Accepted" >Accepted</option>
								<option value="Pending" >Pending</option>
								<option value="Rejected" >Rejected</option>

							</select>

						</div>
					</div>

					<div className="form-item">
						<label className="block text-sm font-medium text-shadow-lg text-gray-100">Phone-Number</label>
						<input
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
							type="tel" required placeholder="222-222-2222"
							value={phoneNumber}
							onChange={e => setPhoneNumber(e.target.value)}
						/>
						{pnErrorMsg ? <p className="mt-2 border-1 border-red-800 bg-red-300 text-red-700 rounded-md px-3">{pnErrorMsg}</p> : ""}
					</div>

					<div className="form-item">
						<label className="block text-sm font-medium text-shadow-lg text-gray-100">Email</label>
						<input
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
							type="email" required placeholder="example@email.com"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						{emailErrorMsg ? <p className="mt-2 border-1 border-red-800 bg-red-300 text-red-700 rounded-md px-3">{emailErrorMsg}</p> : ""}
					</div>

					<div className="form-item">
						<label className="block text-sm font-medium text-shadow-lg text-gray-100">Website Applied</label>
						<input
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
							type="text" required placeholder="indeed.com"
							value={websiteApplied}
							onChange={e => setWebsiteApplied(e.target.value)}
						/>
					</div>

					<div className="form-item">
						<label className="block text-sm font-medium text-shadow-lg text-gray-100">Comments</label>
						<textarea
							className="mt-1 block w-full h-[120px] resize-none rounded-md border-gray-300 shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
							type="text" required value={comments} maxlength="150"
							placeholder="Enter your notes (max 150 characters)"
							onChange={e => setComments(e.target.value)}
						/>
					</div>

					<div className="flex justify-center">
						<button
							className="w-75 items-center bg-emerald-600 text-white font-medium py-2 px-4 mt-5 rounded-md hover:bg-emerald-700 transition active:scale-95 cursor-pointer"
							type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>

			{/* Job Display */}
			<div className="job-list w-full max-w-md bg-neutral-800 p-6 mt-8 rounded-xl shadow-lg">
				<ul className="space-y-4">
					{jobs.map((job, index) => (
						<li key={index}
							className="flex flex-col bg-neutral-700 rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.01] transition-transform duration-200"
							onClick={() => enlargeItem(index)}>
							<div className="flex flex-col">
								<div>
									<div className="flex gap-3">

										<div className="flex-[3] px-2">

											<div>
												<h2 className="text-2xl font-bold text-emerald-400">{job.title}</h2>
												<p className="text-lg font-medium text-gray-300">{job.companyName}</p>
												<p className="text-md text-gray-400">{job.websiteApplied}</p>
											</div>

											<div>
												<p className="text-md font-medium text-gray-300">{job.phoneNumber}</p>
												<p className="text-md font-medium text-gray-300">{job.email}</p>
												<p className="text-sm text-gray-400">{formatDate(job.applyDate)}</p>
											</div>

										</div>
										<div className="flex-[1] px-2 flex flex-col items-center gap-3 justify-center">
											<button type="button" onClick={() => deleteItem(index)}
												className="border-2 border-red-800 px-4 py-1 font-semibold transition duration-300 ease-in-out hover:bg-red-400 active:scale-95 cursor-pointer">
												Delete
											</button>
											<button type="button" onClick={() => updateItem(index)}
												className="border-2 border-sky-800 px-4 py-1 font-semibold transition duration-300 ease-in-out hover:bg-sky-300 active:scale-95 cursor-pointer">
												Edit
											</button>
										</div>

									</div>

									<div className="p-2 mb-2">
										<p className="text-sm font-medium text-gray-400 ">{job.comments}</p>
									</div>

								</div>

								<div>
									<p className={`py-1 text-center text-sm font-semibold mt-2 rounded-md 
									${job.jobStatus.toLowerCase() === "accepted" ? "bg-emerald-400" :
											job.jobStatus.toLowerCase() === "pending" ? "bg-yellow-400" : "bg-red-400"}`
									}>
										{job.jobStatus}
									</p>
								</div>

							</div>
						</li>
					))}
				</ul>
			</div>

		</div>

	);

}

export default Jobs