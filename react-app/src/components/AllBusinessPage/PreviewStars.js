import { useEffect, useState } from 'react'
import './NewBusinessTile.css'

export default function PreviewStars({avg,num}){
    const [starFiller,setStarFiller] = useState({})

    useEffect(()=>{
        let filler = {}
        for(let i=1;i<=5;i++){
            if(i<=avg){
                filler[i] = `${Math.floor(avg)}`
            }else{
                filler[i] = ""
            }
        }
        setStarFiller(filler)
    },[])

    return (
        <div className="previw_stars_container">
            <i className={`fa-solid fa-star single_star stars${starFiller[1]}`}></i>
            <i className={`fa-solid fa-star single_star stars${starFiller[2]}`}></i>
            <i className={`fa-solid fa-star single_star stars${starFiller[3]}`}></i>
            <i className={`fa-solid fa-star single_star stars${starFiller[4]}`}></i>
            <i className={`fa-solid fa-star single_star stars${starFiller[5]}`}></i>
            <p>{num}</p>
        </div>
    )
}
