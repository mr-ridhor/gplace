// "use client";

// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { BiTrash } from "react-icons/bi";
// import { TabsContent } from "@/components/ui/tabs";
// import { Investor } from "@/lib/data/mocked";
// import axios from "axios";
// import LoaderComponent from "@/components/LoaderComponent"; // Ensure your loader component is properly implemented
// import { toast } from "@/components/ui/use-toast";
// import moment from "moment";

// interface Props {
// 	selectedItem?: Investor;
// }

// const Notes: React.FC<Props> = ({ selectedItem }) => {
// 	const [notes, setNotes] = useState<any[]>([]);
// 	const [title, setTitle] = useState("");
// 	const [body, setBody] = useState("");
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [isFetching, setIsFetching] = useState(false); // State to track fetching notes

// 	// Function to load notes when selectedItem changes
// 	const loadNotes = async () => {
// 		if (!selectedItem?._id) return; // Avoid fetching if no selected item

// 		setIsFetching(true); // Set fetching state to true
// 		try {
// 			const response = await axios.get(
// 				`/api/investors/${selectedItem._id}/note`
// 			);
// 			setNotes(response.data); // Update notes state with fetched data
// 		} catch (error) {
// 			console.error("Failed to fetch notes:", error);
// 			alert("Failed to load notes. Please try again later.");
// 		} finally {
// 			setIsFetching(false); // Reset fetching state after operation
// 		}
// 	};

// 	useEffect(() => {
// 		loadNotes(); // Fetch notes on component mount and when selectedItem changes
// 	}, [selectedItem?._id]);

// 	const handleSaveNote = async () => {
// 		if (title.trim() === "" || body.trim() === "") {
// 			alert("Title and body are required.");
// 			return;
// 		}

// 		setIsLoading(true);

// 		try {
// 			const response = await axios.post(
// 				`/api/investors/${selectedItem?._id}/note`,
// 				{ title, body }
// 			);
// 			if (response.status === 201) {
// 				setNotes((prevNotes) => [...prevNotes, response.data]); // Add new note to existing notes
// 				setTitle(""); // Clear title
// 				setBody(""); // Clear body
// 				loadNotes();
// 			}
// 			toast({
// 				title: "Note added successfully",
// 				description: `Note created at ${moment().format(
// 					"MMMM Do YYYY, h:mm:ss a"
// 				)}`,
// 			});
// 		} catch (error) {
// 			console.error("Failed to create note:", error);
// 			// alert("Failed to save note. Please try again.");
// 			toast({
// 				title: "Failed!",
// 				description: `There was a problem with your request. Timestamp: ${moment().format(
// 					"MMMM Do YYYY, h:mm:ss a"
// 				)}`,
// 			});
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	const handleDeleteNote = async (id: string) => {
// 		if (!window.confirm("Are you sure you want to delete this note?")) return; // Confirm deletion

// 		setIsLoading(true);
// 		try {
// 			const response = await axios.delete(
// 				`/api/investors/${selectedItem?._id}/note/${id}`
// 			);
// 			if (response.status === 200) {
// 				setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); // Remove deleted note
// 			}
// 			toast({
// 				title: "Note deleted successfully",
// 				description: `Note deleted at ${moment().format(
// 					"MMMM Do YYYY, h:mm:ss a"
// 				)}`,
// 			});
// 		} catch (error) {
// 			console.error("Failed to delete note:", error);
// 			alert("Failed to delete note. Please try again.");
// 			toast({
// 				title: "Failed!",
// 				description: `There was a problem deleting the note. Timestamp: ${moment().format(
// 					"MMMM Do YYYY, h:mm:ss a"
// 				)}`,
// 			});
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<TabsContent value='notes' className='w-full mt-4'>
// 			<div className='space-y-3'>
// 				<div className='border border-black space-y-3 h-[180px] rounded-md w-full p-2'>
// 					<div className='border-b h-10'>
// 						<Input
// 							className='border-0 focus-visible:ring-0 w-[90%] h-8 appearance-none focus-visible:ring-offset-0'
// 							placeholder='Note title'
// 							value={title}
// 							onChange={(e) => setTitle(e.target.value)}
// 						/>
// 					</div>
// 					<div className='h-[45%]'>
// 						<Textarea
// 							className='border-0 h-full resize-none focus-visible:ring-0 w-full appearance-none focus-visible:ring-offset-0'
// 							placeholder='Enter to type your note body'
// 							value={body}
// 							onChange={(e) => setBody(e.target.value)}
// 						/>
// 						<div className='flex justify-end w-full'>
// 							<Button
// 								className='flex gap-x-1 h-8 items-center'
// 								onClick={handleSaveNote}
// 								disabled={isLoading}
// 							>
// 								{isLoading ? (
// 									<LoaderComponent className='w-4 h-4 white' />
// 								) : (
// 									<p className='text-white'>Save</p>
// 								)}
// 							</Button>
// 						</div>
// 					</div>
// 				</div>
// 				<div className='text-[10px] lg:text-sm space-y-4'>
// 					<p>All your notes</p>
// 					<div className='border w-full rounded-md p-3 text-[10px] lg:text-sm'>
// 						{isFetching ? (
// 							<div className='flex justify-center'>
// 								<LoaderComponent className='w-6 h-6' />{" "}
// 								{/* Loader while fetching notes */}
// 							</div>
// 						) : notes.length === 0 ? (
// 							<p>No notes available.</p>
// 						) : (
// 							notes.map((note) => (
// 								<div key={note._id} className='space-y-3 border-b py-2'>
// 									<div className='flex gap-x-2 h-fit items-center'>
// 										<div className='rounded-full h-6 w-6 bg-gray-300'></div>
// 										<p>{note.title}</p>
// 									</div>
// 									<p>{note.body}</p>
// 									<div className='flex w-full justify-end'>
// 										<Button
// 											className='bg-transparent hover:bg-transparent text-red-700 flex gap-x-1 h-8 items-center'
// 											onClick={() => handleDeleteNote(note._id)}
// 										>
// 											<p>Delete</p>
// 											<BiTrash />
// 										</Button>
// 									</div>
// 								</div>
// 							))
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</TabsContent>
// 	);
// };

// export default Notes;
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BiTrash } from "react-icons/bi";
import { TabsContent } from "@/components/ui/tabs";
import { Investor } from "@/lib/data/mocked";
import axios from "axios";
import LoaderComponent from "@/components/LoaderComponent"; // Ensure your loader component is properly implemented
import { toast } from "@/components/ui/use-toast";
import moment from "moment";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog"; // Import ShadCN AlertDialog components

interface Props {
	selectedItem?: Investor;
}

const Notes: React.FC<Props> = ({ selectedItem }) => {
	const [notes, setNotes] = useState<any[]>([]);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false); // State to track fetching notes
	const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null); // State to track the note being deleted
	console.log("notes", notes);
	// Function to load notes when selectedItem changes
	const loadNotes = async () => {
		if (!selectedItem?._id) return; // Avoid fetching if no selected item

		setIsFetching(true); // Set fetching state to true
		try {
			const response = await axios.get(
				`/api/investors/${selectedItem._id}/note`
			);
			setNotes(response.data); // Update notes state with fetched data
		} catch (error) {
			console.error("Failed to fetch notes:", error);
			alert("Failed to load notes. Please try again later.");
		} finally {
			setIsFetching(false); // Reset fetching state after operation
		}
	};

	useEffect(() => {
		loadNotes(); // Fetch notes on component mount and when selectedItem changes
	}, [selectedItem?._id]);

	const handleSaveNote = async () => {
		if (title.trim() === "" || body.trim() === "") {
			alert("Title and body are required.");
			return;
		}

		setIsLoading(true);

		try {
			const response = await axios.post(
				`/api/investors/${selectedItem?._id}/note`,
				{ title, body }
			);
			if (response.status === 201) {
				setNotes((prevNotes) => [...prevNotes, response.data]); // Add new note to existing notes
				setTitle(""); // Clear title
				setBody(""); // Clear body
				loadNotes();
			}
			toast({
				title: "Note added successfully",
				description: `Note created at ${moment().format(
					"MMMM Do YYYY, h:mm:ss a"
				)}`,
			});
		} catch (error) {
			console.error("Failed to create note:", error);
			toast({
				title: "Failed!",
				description: `There was a problem with your request. Timestamp: ${moment().format(
					"MMMM Do YYYY, h:mm:ss a"
				)}`,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const confirmDeleteNote = async () => {
		if (!deletingNoteId) return;

		setIsLoading(true);
		try {
			const response = await axios.delete(
				`/api/investors/${selectedItem?._id}/note/${deletingNoteId}`
			);
			if (response.status === 200) {
				setNotes((prevNotes) =>
					prevNotes.filter((note) => note._id !== deletingNoteId)
				); // Remove deleted note
				toast({
					title: "Note deleted successfully",
					description: `Note deleted at ${moment().format(
						"MMMM Do YYYY, h:mm:ss a"
					)}`,
				});
			}
		} catch (error) {
			console.error("Failed to delete note:", error);
			toast({
				title: "Failed!",
				description: `There was a problem deleting the note. Timestamp: ${moment().format(
					"MMMM Do YYYY, h:mm:ss a"
				)}`,
			});
		} finally {
			setIsLoading(false);
			setDeletingNoteId(null); // Reset the deletingNoteId state after deletion
		}
	};

	return (
		<TabsContent value='notes' className='w-full mt-4'>
			<div className='space-y-3'>
				<div className='border border-black space-y-3 h-[180px] rounded-md w-full p-2'>
					<div className='border-b h-10'>
						<Input
							className='border-0 focus-visible:ring-0 w-[90%] h-8 appearance-none focus-visible:ring-offset-0'
							placeholder='Note title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className='h-[45%]'>
						<Textarea
							className='border-0 h-full resize-none focus-visible:ring-0 w-full appearance-none focus-visible:ring-offset-0'
							placeholder='Enter to type your note body'
							value={body}
							onChange={(e) => setBody(e.target.value)}
						/>
						<div className='flex justify-end w-full'>
							<Button
								className='flex gap-x-1 h-8 items-center'
								onClick={handleSaveNote}
								disabled={isLoading}
							>
								{isLoading ? (
									<LoaderComponent className='w-4 h-4 white' />
								) : (
									<p className='text-white'>Save</p>
								)}
							</Button>
						</div>
					</div>
				</div>
				<div className='text-[10px] lg:text-sm space-y-4'>
					<p>All your notes</p>
					<div className='border w-full rounded-md p-3 text-[10px] lg:text-sm'>
						{isFetching ? (
							<div className='flex justify-center'>
								<LoaderComponent className='w-6 h-6' />
							</div>
						) : notes.length === 0 ? (
							<p>No notes available.</p>
						) : (
							notes.map((note) => {
								return (
									<div key={note._id} className='space-y-3 border-b py-2'>
										<div className='w-full justify-between flex'>
											<div className='flex gap-x-2 h-fit items-center'>
												<div className='rounded-full h-6 w-6 bg-gray-300'></div>
												<p>{note.title}</p>
											</div>
											<div className=''>
												{note.createdAt
													? moment(note.createdAt).isValid()
														? moment(note.createdAt).format(
																"h:mm, A MMM D, YYYY "
														  )
														: "Date not available"
													: "Date not available"}
											</div>
										</div>
										<p>{note.body}</p>
										<div className='flex w-full justify-end'>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button
														className='bg-transparent hover:bg-transparent text-red-700 flex gap-x-1 h-8 items-center'
														onClick={() => setDeletingNoteId(note._id)} // Set the ID of the note to be deleted
													>
														<p>Delete</p>
														<BiTrash />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Confirm Deletion
														</AlertDialogTitle>
														<AlertDialogDescription>
															Are you sure you want to delete this note? This
															action cannot be undone.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<div className='flex justify-end space-x-2'>
														<AlertDialogCancel
															onClick={() => setDeletingNoteId(null)}
														>
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction
															className='text-white bg-red-500'
															onClick={confirmDeleteNote}
														>
															Delete
														</AlertDialogAction>
													</div>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
		</TabsContent>
	);
};

export default Notes;
