import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../store/auth-context';


function Login() {

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const successfullLoginHandler = () => {
    navigate('/');
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [credentials, setcredentials] = useState({
    email: null,
    password: null,
  })

  const [loginStatus, setloginStatus] = useState(null)




  const [isError, setisError] = useState({
    email: false,
    password: false,
  })



  const formSubmitHandler = async (event) => {
    event.preventDefault();
    let response = null;
    try {

      response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })

      }).then((response) => response.json());



    } catch (error) {
      setloginStatus('An error ocurred while logging in.');
      return;
    }

    console.log(response)

    if (response.status === 'notfound') {
      setloginStatus('User not found in our database.');
    }
    else if (response.status === 'nomatch') {
      setloginStatus('Please enter correct password');
    }
    else if (response.status === 'failure') {
      setloginStatus('An internal server error ocurred');
    }
    else if (response.status === 'success') {
      authCtx.login(response.authToken);

      successfullLoginHandler();
    }


  }


  const emailChangeHandler = (event) => {
    setloginStatus(null);

    setisError((prev) => ({
      ...prev,
      email: false,
    }))




    if (event.target.value.trim().length >= 4 && emailRegex.test(event.target.value)) {


      setcredentials((prev) => ({
        ...prev,
        email: event.target.value,
      }))

    }

    else {
      setisError((prev) => ({
        ...prev,
        email: true,
      }))
    }
  }


  const passwordChangeHandler = (event) => {

    setloginStatus(null);

    setisError((prev) => ({
      ...prev,
      password: false,
    }))




    if (event.target.value.trim().length >= 7) {


      setcredentials((prev) => ({
        ...prev,
        password: event.target.value,
      }))

    }

    else {
      setisError((prev) => ({
        ...prev,
        password: true,
      }))
    }
  }



  const ButtonClass = !isError.email && !isError.password && credentials.email && credentials.password ? 'btn btn-success  m-3' : 'btn btn-success  m-3 disabled'







  return (
    <div className='container mt-5'>
      <form onSubmit={formSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onChange={emailChangeHandler}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          {isError.email && <div className="form-text mt-2 text-danger">Enter a valid email.</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input onChange={passwordChangeHandler} type="password" className="form-control" id="exampleInputPassword1" />
          {isError.password && <div className="form-text mt-2 text-danger">Password length must be atleast 7</div>}
        </div>

        <button type="submit" className={ButtonClass} >Login</button>
        <Link to='/signup' type="submit" className="btn btn-warning   m-3">Create User</Link>

        {loginStatus && <div className='text-center text-success fs-2'> {loginStatus}</div>}

      </form>
    </div>
  )
}

export default Login