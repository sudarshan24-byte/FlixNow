import React, { useEffect, useState } from 'react'
import FlixNowCard from './components/FlixNowCard';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const App = () => {

  const [myData, setMyData] = useState([])

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '29954a07a0msh8f558402d56d01fp1cfd85jsne5f22d9eca4f',
      'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch('https://netflix-data.p.rapidapi.com/search/?query=stranger&offset=0&limit_titles=50&limit_suggestions=20', options)
      const data = await res.json()
      console.log(data);
      setMyData(data.titles)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { fetchData() }, [])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
      <div className='logo'>
        <img src="https://static.vecteezy.com/system/resources/previews/002/442/856/original/f-letter-logo-template-initials-sign-free-vector.jpg" alt=""
          className='img-logo'
        />
        <h1 className='title'>Flix<span className='red'>Now</span></h1>
      </div>
      <Carousel
        swipeable={true}
        responsive={responsive}
      >
        {
          myData.map((curElem) => {
            return <FlixNowCard key={curElem.summary.id} actualData={curElem} />
          })
        }
      </Carousel>
    </div>

  )
}

export default App