import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/Card';
import AuthContext from '../store/auth-context';

function DisplayData() {
  const [FoodItems, setFoodItems] = useState([]);
  const [FoodCategory, setFoodCategory] = useState([]);
  const [searchDetail, setsearchDetail] = useState('');


 
  const authCtx = useContext(AuthContext)
 
   const isLoggedin =  authCtx.isLoggedIn;





//console.log(isLoggedin)



  const ItemsFetchHandler = async () => {
    try {
      const response = await fetch('http://3.111.29.8:5000/api/fetchitems');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setFoodItems(data.FoodItems);
    } catch (error) {
      console.error('Error occurred while fetching the items data:', error);
    }
  };

  const CategoryFetchHandler = async () => {
    try {
      const response = await fetch('http://3.111.29.8:5000/api/fetchcategory');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setFoodCategory(data.FoodCategory);
    } catch (error) {
      console.error('Error occurred while fetching the category data:', error);
    }
  };

  useEffect(() => {
    ItemsFetchHandler();
    CategoryFetchHandler();
  }, []);

  return (

     <>

<div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade"   style = {{objectFit : "contain !important"}} data-bs-ride="carousel">
                <div className="carousel-inner" id='carousel'>

                    <div className='carousel-caption' style = {{zIndex: '10'}} >
                        <div className="d-flex " role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchDetail} onChange={(event)=>(setsearchDetail(event.target.value))} />
                            
                        </div>
                    </div>
                    <div className="carousel-item active"  style = {{filter : 'brightness(30%'}}>
                        <img src="https://source.unsplash.com/random/1080x720?fries" className="d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item" style = {{filter : 'brightness(30%'}}>
                        <img src="https://source.unsplash.com/random/1080x720?burger" className="d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item" style = {{filter : 'brightness(30%'}}>
                        <img src="https://source.unsplash.com/random/1080x720?pizza" className="d-block w-100" alt="" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>





    <div className='container'>

    {!isLoggedin  && <p className='align-items-center text-center mt-5 fs-3'> Login to select the meal!</p>}

      {FoodCategory.map((eachCategory, index) => (
        <div key={index} className='row m-3'>
          <div className='fs-3 text-center text-bg-info '>
            <p key={eachCategory._id}>{eachCategory.CategoryName}</p>
          </div>
          <hr />

          {FoodItems.filter((eachItem)=>((eachItem.CategoryName === eachCategory.CategoryName) && eachItem.name.toLowerCase().includes(searchDetail.toLowerCase()))).map((filteredItem,index)=>(
            <div  key={index} className='col-12 col-md-6 col-lg-3'>

             <Card
                key = {filteredItem._id}
                img={filteredItem.img}
                name={filteredItem.name}
                description={filteredItem.description}
                options={filteredItem.options[0]}
                id = {filteredItem._id}
              />


            </div>

            

              

          ))}
        </div>
      ))}
    </div>


    </>
  );
}

export default DisplayData;
