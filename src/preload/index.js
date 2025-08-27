import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { storeJobData, loadJobData } from "../backend/storage"

// Custom APIs object (currently empty, can add more functions later)
const jobsAPI = {
	saveJobs: (jobs) => storeJobData(jobs),  // Writes jobs array to local JSON file
	loadJobs: () => loadJobData() // Reads jobs array from local JSON file
}



// Check if context isolation is enabled
// Context isolation ensures that renderer code cannot directly access Node/Electron internals
if (process.contextIsolated) {
	try {
		// Expose Electron toolkit APIs safely to renderer
		contextBridge.exposeInMainWorld('electron', electronAPI)

		// Expose a jobs-specific API for saving and loading jobs from the backend
		// These functions are callable from the renderer via `window.api.saveJobs(jobs)` and `window.api.loadJobs()`
		contextBridge.exposeInMainWorld("jobsAPI", jobsAPI)

	} catch (error) {
		// Catch any errors during exposure (e.g., if contextBridge fails)
		console.error(error)
	}
} else {
	// If context isolation is disabled (less secure), attach APIs directly to the window
	window.electron = electronAPI;
	window.jobsAPI = jobsAPI;

	
}
