import { useEffect, useState } from 'react';
import DynamicStars from './DynamicStars';
export default function TestComp(){
    const [stars,setStars] = useState(0)

    return(
        <div>
            <h1>{`number of stars ${stars}`}</h1>
            <DynamicStars stars={stars} setStars={setStars} />
        </div>
    )
}
