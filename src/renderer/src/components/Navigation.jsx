import {useState} from "react";

function Navigation() {

	const [searchTerm, setSearchTerm] = useState("");



	return (
		<div className="w-screen flex items-center relative px-15 py-4">
			<h1 className="text">Job Tracker</h1>
		</div>

	);

}

export default Navigation