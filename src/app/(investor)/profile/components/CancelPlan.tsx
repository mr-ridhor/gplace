import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import React, { useState } from 'react'
import { GrClose } from 'react-icons/gr';


interface Props {
	onClose: () => void;
	isOpen: boolean; // New prop to determine if the dialog is open
}
const CancelPlan = ({onClose,isOpen}:Props) => {
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const handleClose = () => {
		setShowConfirmation(true); // Show confirmation dialog
	};

	// Confirm exit
	const confirmExit = (confirm: boolean) => {
		if (confirm) {
			onClose(); // Close the form
		}
		setShowConfirmation(false); // Hide the confirmation dialog
	};
  return (
    <DialogContent
    onInteractOutside={(e) => {
        e.preventDefault();
    }}
    className=' h-[450px] md:h-fit  max-h-[500px] w-[340px] md:w-[600px] my-3 overflow-auto no-scrollbar'
>
    <div
        onClick={handleClose}
        className='flex flex-col h-8 right-1 absolute m-2 cursor-pointer items-center justify-center rounded-full  hover:bg-gray-200 w-8 p-3 '
    >
        <GrClose size={24} color='black' />
    </div>
    <div className='py-4'>
        <DialogHeader className=' w-full flex text-lg '>
            <strong className='text-sm xl:text-2xl text-left '>
                Personal Information
            </strong>
            <p className='font-light text-sm xl:text-lg'>
                {" "}
                Complete your sign up process and get started with a 1 month free
                tria.
            </p>
        </DialogHeader>
        {/* <Form {...form}>
            <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className='w-full   items-center flex flex-col h-fit '
            >
                <div className='space-y-4 w-full'>
                    <div className='w-full  flex gap-x-4'>
                        <div className='w-1/2 space-y-2'>
                            <FormLabel className='text-sm font-normal'>
                                First Name
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name='firstName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className='focus:border-0 focus-visible:ring-[#04acc2]'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-[10px]' />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-1/2 space-y-2'>
                            <FormLabel className='text-sm font-normal'>
                                Last Name
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name='lastName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className='focus:border-0 focus-visible:ring-[#04acc2]'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-[10px]' />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                 
                  
                </div>
                <div className='w-full'>
                    <DialogClose asChild>
                        <Button
                            // onClick={() => alert("Button clicked")}
                            className='w-full h-10 mt-3   gap-x-1 rounded-md '
                            type='submit'
                        >
                            <p className={`${"text-white"} font-bold`}>Done!</p>
                        </Button>
                    </DialogClose>
                </div>
            </form>
        </Form> */}
    </div>
    {showConfirmation && (
        <div className='absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10'>
            <div className='bg-white p-5 rounded-md shadow-md'>
                <p>Are you sure you want to exit?</p>
                <div className='w-full flex justify-center'>
                    <div className='flex gap-4 mt-4 w-[80%]  justify-between'>
                        <button
                            onClick={() => confirmExit(true)}
                            className='px-4 py-2 bg-[#04acc2] text-white  rounded-md'
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => confirmExit(false)}
                            className='px-4 py-2 bg-[#CCC]  rounded-md'
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )}
</DialogContent>
  )
}

export default CancelPlan
