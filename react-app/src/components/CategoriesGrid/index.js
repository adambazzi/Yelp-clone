
import "./index.css"
import { useSearchParams } from '../../context/SearchParamsContext';
import { useHistory} from 'react-router-dom';
import { isFiltered } from "../../utils/searchAndFilters";

export default function CategoriesGrid(){

    const {searchParams, setSearchParams} = useSearchParams();
    const history = useHistory()

    const handleClick = e =>{
        e.stopPropagation();
        let newContext = {
			...searchParams,
			query: {
				...searchParams.query,
				categories: e.target.getAttribute('value')
			}
		}

        newContext.filters = isFiltered(newContext)
        setSearchParams(()=>newContext)
        return history.push('/businesses')
    }

    return(
        <div class="grid-container">
          <div class="card" value="Breakfast" onClick={handleClick}>
            <img value="Breakfast" src="https://i.imgur.com/Qirig7M.png" alt="Breakfast"/>
            <h2 value="Breakfast">Breakfast</h2>
          </div>
          <div class="card" value="Burger" onClick={handleClick}>
            <img value="Burger" src="https://i.imgur.com/3s1jky2.png" alt="Burger"/>
            <h2 value="Burger">Burger</h2>
          </div>
          <div class="card" value="Italian" onClick={handleClick}>
            <img value="Italian" src="https://i.imgur.com/9pdBVhL.png" alt="Italian"/>
            <h2 value="Italian">Italian</h2>
          </div>
          <div class="card" value="Thai" onClick={handleClick}>
            <img value="Thai" src="https://i.imgur.com/E48mZBv.png" alt="Thai"/>
            <h2 value="Thai">Thai</h2>
          </div>
          <div class="card" value="Chinese" onClick={handleClick}>
            <img value="Chinese" src="https://i.imgur.com/sfDZRfP.png" alt="Chinese"/>
            <h2 value="Chinese">Chinese</h2>
          </div>
          <div class="card" value="Pizza" onClick={handleClick}>
            <img value="Pizza" src="https://i.imgur.com/su6QwUi.png" alt="Pizza"/>
            <h2 value="Pizza">Pizza</h2>
          </div>
          <div class="card" value="French" onClick={handleClick}>
            <img value="French" src="https://i.imgur.com/NOFrSst.png" alt="French"/>
            <h2 value="French">French</h2>
          </div>
          <div class="card" value="Vietnamese" onClick={handleClick}>
            <img value="Vietnamese" src="https://i.imgur.com/E48mZBv.png" alt="Vietnamese"/>
            <h2 value="Vietnamese">Vietnamese</h2>
          </div>
          <div class="card" value="Cafe" onClick={handleClick}>
            <img value="Cafe" src="https://i.imgur.com/BM760dU.png" alt="Cafe"/>
            <h2 value="Cafe">Cafe</h2>
          </div>
        </div>
    )
}
