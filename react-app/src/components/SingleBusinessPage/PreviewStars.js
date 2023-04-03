import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './PreviewStars.css'

export default function PreviewStars({props}) {
    const [starFiller, setStarFiller] = useState({});

    const reviews = useSelector(state => state.business.business.reviews)
    const [review, setReview] = useState();
    const [avg, setAvg] = useState(0);


    useEffect(() => {
        setAvg(props?.stars)
    }, [props])


    useEffect(() => {
      const rounded = Math.round(avg * 2) / 2; // round avg to nearest half decimal
      const stars = Math.floor(rounded); // whole number of stars
      const halfStar = rounded - stars === 0.5; // check if half star should be shown
      let filler = {}
      let index = 1
      if (stars === 0 && halfStar) {
        filler['1'] = 'half1';
        index++
      }

    for(let i=index;i<=5;i++){
        if (i<stars && !halfStar) {
            filler[i] = stars
        } else if (i<stars && halfStar) {
            filler[i] = stars + 1
        } else if (halfStar && i === stars) {
            filler[i] = stars + 1
            filler[i + 1] = `half${stars + 1}`
            i++
        } else if (i === stars && !halfStar){
            filler[i] = stars
        } else {
            filler[i] = ""
        }
    }
    setStarFiller(filler)
    },[avg, reviews])

    return (
        <div className="previw_stars_container">
            <i className={`fa-solid fa-star single_star stars${starFiller[1]}`}></i>
            <i className={`fa-solid fa-star single_star stars${starFiller[2]}`}></i>
            <i className={`fa-solid fa-star single_star stars${starFiller[3]}`}></i>
            <i className={`fa-solid fa-star single_star stars${starFiller[4]}`}></i>
            <i className={`fa-solid fa-star single_star stars${starFiller[5]}`}></i>
        </div>
    );
  }
