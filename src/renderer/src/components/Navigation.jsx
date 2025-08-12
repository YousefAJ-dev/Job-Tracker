
import React from "react";

function Navigation() {

	return (
		<div className="w-screen flex flex-1/2 justify-between px-15 py-4">
			<h1 className="text">Job Tracker</h1>
			<nav className="border-2 border-red-400 px-5 py-2">
				<ul className="flex items-end gap-5">
					<li className="px-4 py-1 border rounded cursor-pointer">Home</li>
					<li className="px-4 py-1 border rounded cursor-pointer">Add New Job</li>
					<li className="px-4 py-1 border rounded cursor-pointer">View Jobs</li>
					<li className="px-4 py-1 border rounded cursor-pointer">Settings</li>
				</ul>
			</nav>
		</div>

	);

}

export default Navigation