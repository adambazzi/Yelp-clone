import { useEffect, useState } from 'react';
import './DynamicStars.css'

export default function DynamicStars(stars){

    const [starsPicked,setStarsPicked] = useState(0)
    const [starsObj,setStarsObj] = useState({
        [1]:'fa-solid fa-star single_star1',
        [2]:'fa-solid fa-star single_star1',
        [3]:'fa-solid fa-star single_star1',
        [4]:'fa-solid fa-star single_star1',
        [5]:'fa-solid fa-star single_star1',
    })

    useEffect(()=>{
        stars.setStars(()=>starsPicked)
    },[starsPicked])


    const resetStars = () =>{
        const newStars = {}
        for(let i = 1;i<6;i++){
            if(i<=starsPicked){
                newStars[i] = `fa-solid fa-star single_star1 color${starsPicked}`
            }else{
                newStars[i] = 'fa-solid fa-star single_star1'
            }
        }
        setStarsObj(newStars)
    }

    const handleHover = e => {
        const newStars = {}
        for(let i = 1;i<6;i++){
            if(i<=e.target.id){
                newStars[i] = `fa-solid fa-star single_star1 color${e.target.id}`
            }else{
                newStars[i] = 'fa-solid fa-star single_star1'
            }
        }
        setStarsObj(newStars)
    }


    return(
        <div id='stars-container'>
        <i
        id={1}
        className={starsObj[1]}
        onMouseOver={handleHover}
        onMouseOut={resetStars}
        onClick={e=>setStarsPicked(e.target.id)}
        ></i>
        <i
        id={2}
        className={starsObj[2]}
        onMouseOver={handleHover}
        onMouseOut={resetStars}
        onClick={e=>setStarsPicked(e.target.id)}
        ></i>
        <i
        id={3}
        className={starsObj[3]}
        onMouseOver={handleHover}
        onMouseOut={resetStars}
        onClick={e=>setStarsPicked(e.target.id)}
        ></i>
        <i
        id={4}
        className={starsObj[4]}
        onMouseOver={handleHover}
        onMouseOut={resetStars}
        onClick={e=>setStarsPicked(e.target.id)}
        ></i>
        <i
        id={5}
        className={starsObj[5]}
        onMouseOver={handleHover}
        onMouseOut={resetStars}
        onClick={e=>setStarsPicked(e.target.id)}
        ></i>
        </div>
    )
}
