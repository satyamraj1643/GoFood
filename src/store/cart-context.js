import React, { useState } from 'react';

const CartContext = React.createContext({
  totalAmount: 0,
  totalItems: 0,
  foodItem: [
    {
      
    },
  ],
  addToCart: (Itemid, Itemname, Itemquantity, Itemsize, sizePrice) => {},

   removeAllFromCart: () => { },
});

export const CartContextProvider = (props) => {
  const [TotalAmount, setTotalAmount] = useState(0);
  const [TotalItems, setTotalItems] = useState(0);
  const [CartItems, setCartItems] = useState([
    {
      name: '',
      size: '',
      quantity: '',
      sizePrice: '',
      id: '',
      thisAmount:'',
    },
  ]);

  const addToCartHandler = (Itemid, Itemname, Itemquantity, Itemsize, sizePrice) => {

         
     const alreadyPresentIndex = CartItems.findIndex(item => item.id === Itemid);

     if( alreadyPresentIndex !== -1){
        const existingItem = CartItems[alreadyPresentIndex];
        const updatedItem = {...existingItem, quantity: +(existingItem.quantity) + +(Itemquantity), thisAmount: +(existingItem.thisAmount) + ((Itemquantity)*(sizePrice))};

        CartItems[alreadyPresentIndex] = updatedItem;

        // const updatedQuantity= updatedItem.quantity;
        // const updatedAmount = updatedItem.thisAmount
        


        setCartItems((prev) => [...prev]); 

        setTotalAmount((prev) => prev + (+Itemquantity * sizePrice));
        setTotalItems((prev) => prev + (+Itemquantity));


       

     }
     else{

      const itemObject = {
        name: Itemname,
        size: Itemsize,
        quantity: Itemquantity,
        sizePrice: sizePrice,
        id: Itemid,
        thisAmount: (sizePrice * Itemquantity),
      };
  
      setCartItems((prev) => [...prev, itemObject]);
      
  
      setTotalAmount((prev) => (prev + sizePrice * Itemquantity));
      
      
      setTotalItems((prev)=> (prev + (+Itemquantity)));

     }



    
   

      
  };
  const removeAllFromCart = () => {
    setCartItems([]);
    setTotalAmount(0);
    setTotalItems(0);
  };

  const contextValue = {
    totalAmount: TotalAmount,
    totalItems: TotalItems,
    foodItem: CartItems,
    addToCart: addToCartHandler,
    removeAllFromCart : removeAllFromCart,
  };

 

  return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>;
};

export default CartContext;
