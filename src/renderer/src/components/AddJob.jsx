import { useEffect, useState } from "react";

function AddJob({ onAddJob, editingJob, onEdit }) {
	const [companyName, setCompanyName] = useState("");
	const [title, setTitle] = useState("");
	const [applyDate, setApplyDate] = useState("");
	const [jobStatus, setJobStatus] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [websiteApplied, setWebsiteApplied] = useState("");
	const [comments, setComments] = useState("");

	const [pnErrorMsg, setPnErrorMsg] = useState("");
	const [emailErrorMsg, setEmailErrorMsg] = useState("");


	// pre-fills data of editing job with current values
	useEffect(() => {

		if (editingJob) {
			setTitle(editingJob.title);
			setCompanyName(editingJob.companyName);
			setApplyDate(editingJob.applyDate);
			setJobStatus(editingJob.jobStatus);
			setPhoneNumber(editingJob.phoneNumber);
			setEmail(editingJob.email);
			setWebsiteApplied(editingJob.websiteApplied);
			setComments(editingJob.comments);
		} else {
			setCompanyName("");
			setTitle("");
			setApplyDate("");
			setJobStatus("");
			setPhoneNumber("");
			setEmail("");
			setWebsiteApplied("");
			setComments("");
		}

	}, [editingJob]);



	function validateEmail(email) {

		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}

	function validatePhoneNumber(phoneNumber) {

		const re = /^\+?[\d\s\-()]{7,15}$/;
		return re.test(phoneNumber);
	}


	// Handles form submission for both adding and editing jobs
	function handleSubmit(e) {
		e.preventDefault(); // Prevents the default form refresh on submit

		// Validation checks — makes sure no required fields are empty
		if (
			title.trim() === "" ||
			companyName.trim() === "" ||
			applyDate.trim() === "" ||
			jobStatus.trim() === "" ||
			phoneNumber.trim() === "" ||
			email.trim() === ""
		) {
			return; // Stop if any required field is missing
		}
		/* Validate email format
		else if (!validateEmail(email)) {
			setEmailErrorMsg("Please enter a valid email.");
			return;
		}*/
		// Validate phone number format
		else if (!validatePhoneNumber(phoneNumber)) {
			setPnErrorMsg("Please enter a valid Phone Number.");
			return;
		}

		// Create a new job object from form inputs
		const newJob = {
			title,
			companyName,
			applyDate,
			jobStatus,
			phoneNumber,
			email,
			websiteApplied,
			comments
		};

		// If we're editing an existing job
		if (editingJob) {
			// Call parent's onEdit function with the updated job data
			// Spread operator keeps the original `id` and other unchanged fields
			onEdit({
				...editingJob,
				title,
				companyName,
				applyDate,
				jobStatus,
				phoneNumber,
				email,
				websiteApplied,
				comments
			});
		}
		// Otherwise, we're adding a new job
		else {
			// Call parent's onAddJob function with new job + a generated id
			onAddJob({
				...newJob,
				id: Date.now() // Creates a unique ID based on timestamp
			});
		}

		// Reset form fields after submit
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

	return (
		<form onSubmit={handleSubmit} className="space-y-4 w-full">
			{/* Title */}
			<div className="form-item">
				<label className="block text-sm font-medium text-gray-100">Title</label>
				<input
					required
					className="mt-1 block w-full rounded-md shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
			</div>

			{/* Company */}
			<div className="form-item">
				<label className="block text-sm font-medium text-gray-100">Company</label>
				<input
					required
					className="mt-1 block w-full rounded-md shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
					type="text"
					value={companyName}
					onChange={e => setCompanyName(e.target.value)}
				/>
			</div>

			{/* Date & Status */}
			<div className="flex gap-4">
				<div className="flex-1">
					<label className="block text-sm font-medium text-gray-100">Date Applied</label>
					<input
						required
						className="mt-1 block w-full rounded-md shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
						type="date"
						value={applyDate}
						onChange={e => setApplyDate(e.target.value)}
					/>
				</div>

				<div className="flex-1">
					<label className="block text-sm font-medium text-gray-100">Status</label>
					<select
						required
						className="mt-1 block w-full rounded-md shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
						value={jobStatus}
						onChange={e => setJobStatus(e.target.value)}
					>
						<option value="">Select option:</option>
						<option value="Accepted">Accepted</option>
						<option value="Pending">Pending</option>
						<option value="Interview">Interview</option>
						<option value="Rejected">Rejected</option>
					</select>
				</div>
			</div>

			{/* Phone */}
			<div className="form-item">
				<label className="block text-sm font-medium text-gray-100">Phone Number</label>
				<input
					required
					placeholder="222-222-2222"
					className="mt-1 block w-full rounded-md shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
					type="tel"
					value={phoneNumber}
					onChange={e => setPhoneNumber(e.target.value)}
				/>
				{pnErrorMsg && (
					<p className="mt-2 bg-red-300 text-red-700 rounded-md px-3">{pnErrorMsg}</p>
				)}
			</div>

			{/* Email */}
			<div className="form-item">
				<label className="block text-sm font-medium text-gray-100">Email</label>
				<input
					required
					placeholder="example@email.com"
					className="mt-1 block w-full rounded-md shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
					type="text"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				{emailErrorMsg && (
					<p className="mt-2 bg-red-300 text-red-700 rounded-md px-3">{emailErrorMsg}</p>
				)}
			</div>

			{/* Website */}
			<div className="form-item">
				<label className="block text-sm font-medium text-gray-100">Website Applied</label>
				<input
					required
					placeholder="indeed.com"
					className="mt-1 block w-full rounded-md shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
					type="text"
					value={websiteApplied}
					onChange={e => setWebsiteApplied(e.target.value)}
				/>
			</div>

			{/* Comments */}
			<div className="form-item">
				<label className="block text-sm font-medium text-gray-100">Comments</label>
				<textarea
					maxLength={150}
					placeholder="Enter your notes (max 150 characters)"
					className="mt-1 block w-full h-[120px] resize-none rounded-md shadow-sm bg-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none p-2"
					value={comments}
					onChange={e => setComments(e.target.value)}
				/>
			</div>

			{/* Submit */}
			<div className="flex justify-center">
				<button
					className="bg-emerald-600 text-white font-medium py-2 px-4 mt-5 rounded-md hover:bg-emerald-700 transition active:scale-95"
					type="submit"
				>
					{ editingJob ? "Apply Changes" : "Add Job" }
				</button>
			</div>
		</form>
	);

}

export default AddJob