import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import CartContext from '../store/cart-context';

function Navbar() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();
  const cartItem = useContext(CartContext);


  const logOutHandler = () => {
    navigate('/');
    authCtx.logout();
  };




  const placeOrderHandler = () => {
    cartItem.removeAllFromCart();
  }







  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto m-2">
              <Link className="nav-link active fs-5 absalign-items-center align-content-center " aria-current="page" to="/">
                Home
              </Link>
              {isLoggedIn && <Link className="nav-link active fs-5 absalign-items-center align-content-center" to="/myorders">My Orders</Link>}
            </div>

            {!isLoggedIn && (
              <div className="d-flex m-2 p-2">
                <Link className="btn bg-white text-primary m-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-primary m-1" to="/signup">
                  Signup
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <div className="d-flex m-2 p-2">
                <div className="d-inline me-3"> {/* Added margin to create space */}
                  <div className="position-relative">
                    <button type="button" className="btn bg-white text-primary bg-success mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      My Cart
                    </button>
                    <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                      {cartItem.totalItems}
                    </div>
                  </div>
                </div>

                <div className="d-inline">
                  <button type="button" onClick={logOutHandler} className="btn bg-white text-danger mx-1">
                    Logout
                  </button>
                </div>
              </div>

            )}
          </div>
        </div>
      </nav>



      {(
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  My Cart
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Index</th>
                      <th scope="col">Name</th>
                      
                      <th scope="col">Quantity</th>
                      
                     
                      <th scope="col">Per-Item</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {cartItem.foodItem.map((eachItem, index) =>
                      // Use parentheses to wrap JSX elements
                      index === 0 ? (
                        ''
                      ) : (
                        <tr key={index}>
                          <th scope="row">{index}</th>
                          <td>{eachItem.name}</td>
                          
                          <td>{eachItem.quantity}</td>
                         
                          <td>₹{eachItem.sizePrice}</td>
                          <td>₹{eachItem.thisAmount}</td>
                        </tr>
                      )
                    )}

                    <tr>
                      <th scope="row">Total </th>
                      <td></td>
                      <td>{cartItem.totalItems}</td>
                      <td> </td>
                      <td>₹{cartItem.totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >
                  Close
                </button>
                {cartItem.totalItems >= 1 && <Link to='/order' onClick={placeOrderHandler} className="btn btn-primary">
                  Place Order
                </Link>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;