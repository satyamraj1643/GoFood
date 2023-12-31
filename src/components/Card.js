import React from 'react'
import { useState, useContext, useEffect } from 'react';

import AuthContext from '../store/auth-context';
import CartContext from '../store/cart-context';





function CapitaliseFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function Card(props) {

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  

  const isLoggedin = authCtx.isLoggedIn;

  const [selectedSize, setselectedSize] = useState('');
  const [priceTotal, setpriceTotal] = useState(0);
  const [selectedQuantity, setselectedQuantity] = useState(1)


  let options = props.options;
  let priceOptions = Object.keys(options);



  //console.log(isLoggedin);

  const optionChangeHandler = (event) => {

    setselectedSize(event.target.value);
  }

  const quantityChangeHandler = (event) => {
    setselectedQuantity(event.target.value);

  }


  useEffect(() => {
    const selectedSizeval = selectedSize === ''? priceOptions[0]:selectedSize;
    const price = +options[selectedSizeval];
    const quantity = selectedQuantity;
    

    if (!isNaN(price) && !isNaN(quantity)) {
      const totPrice = price * quantity;
      setpriceTotal(totPrice);
    } else {
      const init = +options[priceOptions[0]]
      setpriceTotal(init); // or any other default value
     
    }


  }, [selectedSize, selectedQuantity, options, priceOptions]);


  const addToCartHandler = () =>{
          const name =  props.name;
          const size =  selectedSize === ''? priceOptions[0]:selectedSize;
          const quantity = selectedQuantity;
          //console.log(size,quantity);
          const sizePrice = options[size];
          // console.log(sizePrice)
          // console.log(quantity)
          const id = props.id;
         // console.log(id,name,quantity,size,sizePrice)

          cartCtx.addToCart(id,name,quantity,size,sizePrice);
          
  }











  return (
    <div className='d-flex m-2  justify-content-center align-items-center'>

      <div className="card   align-items-center " style={{ width: '30rem', }}>
        <img className="card-img-top  " style={{ height: '280px', objectFit: 'cover' }} src={props.img} alt='' />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}.</p>
          <div>
            <hr />

            <div className='d-flex  justify-content-even align-items-center'>
              <select onChange={quantityChangeHandler} className='me-1 h-100 bg-success rounded p-1'>
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select className=' h-100 me-1 bg-success rounded p-1' onChange={optionChangeHandler} >
                {priceOptions.map((each) => (
                  <option key={each} value={each}>{CapitaliseFirst(each)}</option>
                ))}
              </select>



              <div className=' d-inline  m-1 h-100 fw-semibold fs-5  text-warning'>
                {`Price : ₹${priceTotal} `}
              </div>

            </div>

            <hr />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <button onClick={addToCartHandler} disabled={!isLoggedin} className='btn bg-success text-center mt-4'>Add to Cart</button>
            </div>


          </div>
        </div>
      </div>
    </div>

  )
}

export default Card