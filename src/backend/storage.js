/** HOW TO READ AND WRITE TO FILES
 * 
 * fs module = a module used to read and write through fs (file-system)
 * 
 * write to  = fs.writeFileSync(FILE , msg);
 * fs.writeFileSync(FILE, "Hello from Node.js!");
 * console.log("✅ Wrote to file:", FILE);

 * read file = fs.readFileSync(FILE, "utf-8");
 * console.log("📖 File contents:", contents);
	
*/
import fs from 'fs';
import { app } from "electron";
import path, { join } from "path";

const FILE = path.join(__dirname, "../../data/jobs.json");

//const FILE = path.join(app.getPath("userData"), "jobs.json");

/**
 * storeJobData - Saves an array of job objects to a local JSON file
 * @param {Array} jobs - Array of job objects to save
 */
export async function storeJobData(jobs) {
	try {
		// Convert the jobs array into a JSON string
		const jobsData = JSON.stringify(jobs, null, 2) // Pretty-print with 2-space indentation

		// fs.writeFileSync seems works fine for simple apps, 
		//fs.writeFile(FILE, jobsData)
		// but async is better to avoid blocking the event loop.
		await fs.promises.writeFile(FILE, jobsData)

	} catch (error) {
		console.error("Error saving jobs:", error)
	}
}

/**
 * loadJobData - Reads job data from the local JSON file
 * @returns {Array} - Returns an array of jobs, or empty array if file doesn't exist or fails
 */
export function loadJobData() {
	try {
		// Check if the file exists
		if (!fs.existsSync(FILE)) {
			return [] // Return empty array if no file exists yet
		}

		// Read file contents as a string
		const data = fs.readFileSync(FILE, "utf-8")

		// Convert JSON string back into a JavaScript array
		return JSON.parse(data)
	} catch (error) {
		console.error("Error loading jobs:", error)
		return [] // Return empty array on error to avoid crashing
	}
}
