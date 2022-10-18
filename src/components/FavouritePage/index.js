

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from 'antd';
import './style.css';

function FavouritePage() {

  const [favouriteList, setFavouriteList] = useState([])

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = location.state;
    setFavouriteList(data)
  })


  return (

    <div className="main-container">
      <h2>Favourite Images</h2>

      <div className='btn-container'>

        <Button onClick={() => navigate(-1)} type="primary">
          Go back
        </Button>

      </div>

      <div className="images-container">
        {favouriteList?.map((image) => {
          return (
            <div className="img-wrapper" key={image.id}>
              <img src={image.src} alt='flickr-image' />
            </div>
          );
        })}
      </div>

    </div>

  )
}

export default FavouritePage
