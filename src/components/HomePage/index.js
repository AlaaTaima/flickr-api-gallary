
import React, { useState, useEffect } from 'react';
import { Select, Spin, Button, message, Input, Empty, Result } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import './style.css';

const HomePage = () => {

  const [loading, setLoading] = useState(true);
  const [imagesList, setImagesList] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [favouriteList, setFavouriteList] = useState([])

  const { Option } = Select;
  const { Search } = Input;

  const handleChange = (value) => {
    fetchImages(value)
  };

  const onSearch = (value) => {
    const filteredImgs = imagesList.filter(img => img.title.includes(value));
    setImagesList(filteredImgs)
    if (!filteredImgs.length) {
      message.error('There is no matched result')
    } else {
      message.success(`${filteredImgs.length} available`)
    }
  }
  const addToFavourite = (img) => {

    if (!favouriteList.includes(img)) {
      setFavouriteList(favouriteList.concat([img]))
      const updatedList = imagesList.map(ele => {
        if (ele.src === img.src) {
          ele.favourite = 'true'
        }

        return ele;

      })
      message.success('Added to favourites');
      setImagesList(updatedList)
    }

  }

  const fetchImages = async (numberOfImgs = 10) => {
    try {

      //secret : 42c6a0ed3e10aa46
      // api_key: '972d542970900b2ce9c274bced9e87ac',

      fetch(`http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&tags=technology&tag_mode=all&per_page=${numberOfImgs}&page=${page}&api_key=972d542970900b2ce9c274bced9e87ac&nojsoncallback=1`)
        .then(res => res.json())
        .then((data) => {
          console.log({ data })
          const srcList = data.photos.photo.map(pic => {
            const imgSrc = `http://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`
            return { src: imgSrc, title: pic.title, id: `${imgSrc}${Math.random()}` }
          }
          )

          setImagesList(srcList)
          setLoading(false);
          setError('');
        })

    } catch (err) {
      const message = err.response
        ? err.response.data.message
        : 'sorry, something went wrong , try again later !';

      setLoading(false);
      setError(message);
    }
  };

  useEffect(() => {
    fetchImages()
  }, [page]);


  console.log(imagesList);

  return (

    <>

      {
        error ? (
          <Result
            status="500"
            title="Error, somthing went wrong try again"
            subTitle={error}
          />
        ) :
        loading ?
          <div className='spinner-container'>
            <Spin size="large" />
          </div>
          :
          <div className="main-container">
            <h2>Flickr API Images Gallery</h2>

            <Search
              placeholder="search term"
              allowClear
              enterButton="Search by"
              size="large"
              onSearch={onSearch}
            />

            <div className='sub-container'>

              <div className='btn-container'>
                <Select
                  defaultValue="10"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                >
                  <Option value="10">10</Option>
                  <Option value="20">20</Option>
                  <Option value="50">50</Option>
                </Select>

                <Button type="primary">
                  <Link to='/favoriteImg' state={favouriteList} > My Favourites
                  </Link>
                </Button>

              </div>

              <div className="images-container">
                {imagesList.length ? imagesList.map((image) => {
                  return (
                    <div className="img-wrapper" key={image.id}>
                      <img src={image.src} alt='flickr-image' />

                      <div onClick={() => addToFavourite(image)}>


                        {image.favourite ? <HeartFilled
                          style={{
                            cursor: "pointer",
                            position: 'absolute',
                            right: "10%",
                            top: "85%",
                            fontSize: '25px', color: 'red', fontWeight: 'bold'
                          }} /> : <HeartOutlined
                          style={{
                            cursor: "pointer",
                            position: 'absolute',
                            right: "10%",
                            top: "85%",
                            fontSize: '25px', color: '#222121', fontWeight: 'bold'
                          }} />}


                      </div>


                    </div>
                  );
                }) : <Empty />}
              </div>
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prevState) => prevState - 1)}
                >
                  Prev
                </button>
                <p>{page}</p>
                <button onClick={() => setPage((prevState) => prevState + 1)}>
                  Next
                </button>
              </div>
            </div>
          </div>
      }

    </>

  );

};


export default HomePage;
