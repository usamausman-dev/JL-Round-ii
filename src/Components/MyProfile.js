import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyProfile({ stddataid }) {
    const { data: session, status } = useSession()



    const router = useRouter();


    const [open, setOpen] = useState(false);
    const [ProfileEmail, setProfileEmail] = useState(session.user.email);
    const [ProfileName, setProfileName] = useState('');


    const [Salary, setSalary] = useState("")



    console.log(session.user.email)



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function AddProfileHandler() {
        // let payload = {
        //     email: ProfileEmail,
        //     salary: Salary,
        // }
        let payload = {
            name: ProfileName,
            email: ProfileEmail
        }


        axios.post('/api/CreateUserProfile', payload)
            .then(function (response) {
                alert("succcess")
                setOpen(false);


                axios.post('/api/AddSalary', {
                    email: ProfileEmail,
                    salary: Salary,
                })
                    .then(function (response) {
                        alert("succcess")
                        setOpen(false);
                    })
                    .catch(function (error) {
                        console.log(error.response);
                    });
            })
            .catch(function (error) {
                console.log(error.response);
            });



    }

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-blue-600 mx-2  text-white px-10 py-3 rounded-lg'> + <span className='sm:hidden md:hidden lg:inline-block'>Profile </span></button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="xl"
                fullScreen={true}
            >
                <DialogTitle>
                    <div className='flex   justify-between'>
                        <h1 className='text-xl'>Profile</h1>
                        <button onClick={handleClose}>x</button>

                    </div>
                </DialogTitle>



                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" component="span">

                        <div className='grid grid-cols-1 gap-5'>
                            <div className='flex flex-col  '>
                                <label htmlFor="name">Profile Email</label>
                                <input required value={ProfileEmail} onChange={(e) => setProfileEmail(e.target.value)} type="text" name="ProfileEmail" id="ProfileEmail" placeholder='Profile Email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>

                            <div className='flex flex-col  '>
                                <label htmlFor="name">Profile Name</label>
                                <input required value={ProfileName} onChange={(e) => setProfileName(e.target.value)} type="text" name="ProfileName" id="ProfileName" placeholder='ProfileName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>



                            <div className='flex flex-col  '>
                                <label> Profile Salary</label>
                                <input type="number" required value={Salary} onChange={(e) => setSalary(e.target.value)} name="Salary" id="Salary" placeholder='Profile Salary ' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>

                            <button onClick={AddProfileHandler} className='bg-blue-600 px-3 py-2 rounded text-white'>Add Profile</button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}