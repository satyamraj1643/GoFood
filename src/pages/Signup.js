import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'




function Signup() {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const port = process.env.BACKENDPORT

    

    const [credentials, setcredentials] = useState({
        name: null,
        password: null,
        email: null,
        location: null

    })

    const [submissionStatus, setsubmissionStatus] = useState(null);


    const [errorState, seterrorState] = useState({
        name: false,
        password: false,
        email: false,
        location: false
    })

    const [firstTime, setfirstTime] = useState({
        name: true,
        password: true,
        email: true,
        location: true
    })

    const onNameBlurr = (event) => {

        if (event.target.value.trim().length === 0) {
            setfirstTime((prev) => ({
                ...prev,
                name: true,
            }))

        }

    }

    const onEmailBlurr = (event) => {

        if (emailRegex.test(event.target.value)) {
            setfirstTime((prev) => ({
                ...prev,
                email: true,
            }))

        }

    }


    const onPasswordBlurr = (event) => {

        if (event.target.value.trim().length === 0) {
            setfirstTime((prev) => ({
                ...prev,
                password: true,
            }))

        }

    }


    const onLocationBlurr = (event) => {

        if (event.target.value.trim().length === 0) {
            setfirstTime((prev) => ({
                ...prev,
                location: true,
            }))

        }

    }



    const nameChangeHandler = (event) => {
      
        setfirstTime((prev) => ({
            ...prev,
            name: false,
        }))

        if (event.target.value.trim().length >= 6 && nameRegex.test(event.target.value)) {
            seterrorState((prev) => ({
                ...prev,
                name: false,
            }))

            setcredentials((prev) => ({
                ...prev,
                name: event.target.value,
            }))
        }
        else {
            seterrorState((prev) => ({
                ...prev,
                name: true,
            }))
        }


    }


    const passwordChangeHandler = (event) => {
       

        setfirstTime((prev) => ({
            ...prev,
            password: false,
        }))

        if (event.target.value.trim().length >= 7) {
            seterrorState((prev) => ({
                ...prev,
                password: false,
            }))

            setcredentials((prev) => ({
                ...prev,
                password: event.target.value,
            }))
        }
        else {
            seterrorState((prev) => ({
                ...prev,
                password: true,
            }))
        }

    }

    const emailChangeHandler = (event) => {
        
        setfirstTime((prev) => ({
            ...prev,
            email: false,
        }))

        if (emailRegex.test(event.target.value)) {
            seterrorState((prev) => ({
                ...prev,
                email: false,
            }))

            setcredentials((prev) => ({
                ...prev,
                email: event.target.value,
            }))
        }
        else {
            seterrorState((prev) => ({
                ...prev,
                email: true,
            }))
        }

    }
    const locationChangeHandler = (event) => {
        

        setfirstTime((prev) => ({
            ...prev,
            location: false,
        }))

        if (event.target.value.trim().length >= 1) {
            seterrorState((prev) => ({
                ...prev,
                location: false,
            }))

            setcredentials((prev) => ({
                ...prev,
                location: event.target.value,
            }))
        }
        else {
            seterrorState((prev) => ({
                ...prev,
                location: true,
            }))
        }
    }





    const submitHandler = async (event) => {
        event.preventDefault();

        try {

            const response = await fetch("https://gofood-api.onrender.com/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.location
                })

            }).then((response)=>response.json());



            if(response.success === 'already'){
                setsubmissionStatus('A user with this account already exists. Please use another account.');
                
            }
            else if(response.success===true){
                setsubmissionStatus('Account created successfully');
            }
                
               
            

            console.log(credentials);




        } catch (error) {
            setsubmissionStatus('An error ocurred while creating the account! Please try again later')
            console.log(error);
        }


    }


    const submitButtonClass = credentials.name && credentials.email && credentials.password && credentials.location && !errorState.name && !errorState.email && !errorState.password && !errorState.location ? "m-3 btn btn-success" : "m-3 btn btn-success disabled";

    return (
        <>
            <div className='container mt-5'>


                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor='name' className="form-label">Username</label>
                        <input onBlur={onNameBlurr} onChange={nameChangeHandler} type="text" className="form-control" id="name" aria-describedby="usernameHelp" />
                        {!firstTime.name && errorState.name && <div className="form-text mt-2  text-danger"> Length must be atleast 5 charactors and only alphabets allowed</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input onBlur={onEmailBlurr} onChange={emailChangeHandler} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        {!firstTime.email && errorState.email && <div className="form-text mt-2  text-danger">Enter a valid email</div>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onBlur={onPasswordBlurr} onChange={passwordChangeHandler} type="password" className="form-control" id="password" />
                        {!firstTime.password && errorState.password && <div className="form-text mt-2  text-danger">Password length must be greater than 7</div>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input onBlur={onLocationBlurr} onChange={locationChangeHandler} type="location" className="form-control" id="location" />
                        <div className="form-text mt-2 text-warning">Enter a valid location, else there will be delivery issues.</div>

                    </div>



                    <button type="submit" className={submitButtonClass} >Submit</button>
                    <Link to='/login' className="m-3 btn btn-danger  "> Already a user?</Link>
                </form>

                {submissionStatus && <div className='text-center text-success fs-2'> {submissionStatus}</div>}
                {submissionStatus && <Link to='/login' className='m-3 btn btn-success'>Go Back</Link>}



            </div>
        </>
    )
}

export default Signup
