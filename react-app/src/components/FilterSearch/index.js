import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {useSearchParams} from "../../context/SearchParamsContext"
import { isFiltered } from '../../utils/searchAndFilters';
import './index.css'

export default function FilterSearch(){
    const {searchParams, setSearchParams} = useSearchParams()
    const businesses = useSelector(state => state.business.all_businesses);
    const [priceFilter,setPriceFilter] = useState({1:false,2:false,3:false,4:false})
    const [features,setFeatures] = useState([])
    const [featuresObj,setFeaturesObj] = useState({})
    const [cities,setCities] = useState([])
    const [citiesObj,setCitiesObj] = useState({})
    const [categories,setCategories] = useState([])
    const [catObj,setCatObj] = useState({})
    const [activeFilters,setActiveFilters] = useState({})


    //Setup arrays for filters
    useEffect(()=>{
        if(businesses){
            setFeatures(()=>[...new Set(Object.values(businesses).map(el=>el.features).filter(el=>el).join(',').split(','))])
            let newFeaturesObj = {}
            Object.values(businesses).map(el=>el.features).filter(el=>el).join(',').split(',').forEach(el=>{
                newFeaturesObj[el] = false;
            })
            //[delivery,takeput,open24]
            setFeaturesObj(newFeaturesObj)

            let citiesArr = [...new Set(Object.values(businesses).map(el=>el.city))]
            setCities(()=>citiesArr)
            let newCityObj = {}
            citiesArr.forEach(el=> newCityObj[el] = false)
            setCitiesObj(()=>newCityObj)

            let categoriesArr = Object.values(businesses)
            .map(el=> el.categories)
            categoriesArr = [].concat(...categoriesArr).map(el=>el?.categoryName)
            categoriesArr = [...new Set(categoriesArr)]
            setCategories(()=>categoriesArr)
            let newCatObj = {}
            categoriesArr.forEach(el=>{
                if(el===searchParams.query.categories){
                    newCatObj[el] = true
                }else{
                    newCatObj[el] = false
                }
            })
            setCatObj(()=>newCatObj)
        }
    },[businesses])

    useEffect(()=>{
        let priceString = ""
        for(let i=1;i<5;i++){
            if(priceFilter[i]) priceString+=`${i},`
        }
        let newContext = {
			...searchParams,
			query: {
                ...searchParams.query,
				price: priceString.slice(0,priceString.length-1)
			}
		}
        newContext.filters = isFiltered(newContext)
        setSearchParams(()=>newContext)
    },[priceFilter])


    useEffect(()=>{
        let featuresQuery = []
        Object.entries(featuresObj).forEach(el=>{
            if(el[1]) featuresQuery.push(el[0])
        })
        let newContext = {
            ...searchParams,
			query: {
                ...searchParams.query,
				features: featuresQuery.join(',')
			}
		}
        newContext.filters = isFiltered(newContext)
        setSearchParams(()=>newContext)
    },[featuresObj])

    useEffect(()=>{
        let citiesQuery = []
        Object.entries(citiesObj).forEach(el=>{
            if(el[1]) citiesQuery.push(el[0])
        })

        let newContext = {
            ...searchParams,
			query: {
                ...searchParams.query,
				city: citiesQuery.join(',')
			}
		}
        newContext.filters = isFiltered(newContext)
        setSearchParams(()=>newContext)

    },[citiesObj])

    const handlePriceChange = (e) =>{
        let newPriceObj = {
            ...priceFilter,
            [e.target.value]: !priceFilter[e.target.value]
        }
        setPriceFilter(newPriceObj)
    }

    const handleFeatureChange = (e) =>{
        let newfeatObj = {
            ...featuresObj,
            [e.target.value]: !featuresObj[e.target.value]
        }
        setFeaturesObj(newfeatObj)
    }

    const handleCityChange = e =>{
        let newCityObj = {
            ...citiesObj,
            [e.target.value]: !citiesObj[e.target.value]
        }
        setCitiesObj(newCityObj)
    }

    const handleCategoryChange = e =>{
        if(e.target.value===searchParams.query.categories){

            let newContext = {
                ...searchParams,
                query: {
                    ...searchParams.query,
                    categories: ''
                }
            }
            newContext.filters = isFiltered(newContext)
            setSearchParams(()=>newContext)

            setCatObj({
                ...catObj,
                [e.target.value]:false
            })
        }
        let newCatObj = {
            ...catObj,
            [searchParams.query.categories]:false,
            [e.target.value]:true
        }
        setCatObj(()=>newCatObj)

        let newContext = {
            ...searchParams,
			query: {
                ...searchParams.query,
				categories: e.target.value
			}
		}
        newContext.filters = isFiltered(newContext)
        setSearchParams(()=>newContext)
    }

    useEffect(()=>{
        let newCatObj = {}
        categories.forEach(el=>{
            newCatObj[el] = el === searchParams.query.categories
        })
        setCatObj(()=>newCatObj)
    },[searchParams.query.categories])

    useEffect(()=>{
        if(searchParams.filters){
            let newActive = {}
            if(searchParams.search.length) newActive.search = [searchParams.search]
            if(searchParams.query.city.length) newActive.cities = searchParams.query.city.split(',')
            if(searchParams.query.price.length) newActive.price = searchParams.query.price.split(',').map(el=> '$'.repeat(Number(el)))
            if(searchParams.query.categories.length) newActive.categories = searchParams.query.categories.split(',')
            if(searchParams.query.features.length) newActive.features = searchParams.query.features.split(',')
            setActiveFilters(()=>newActive)
        }else{
            setActiveFilters({})
        }
    },[searchParams])

    const clearFilters = e => {
        setPriceFilter(()=>({1:false,2:false,3:false,4:false}))
        // setFeatures(()=>[])
        setFeaturesObj(()=>({}))
        // setCities(()=>[])
        setCitiesObj(()=>({}))
        // setCategories(()=>[])
        setCatObj(()=>({}))
        setActiveFilters(()=>({}))
        setSearchParams(()=>({
            filters:false,
            search: '',
            query: {
              city: '',
              state: '',
              price: '',
              categories: '',
              features: ''
            }
          }))
    }


    return (
        <div className='filters-menu'>
            <h3>Filter Results</h3>
            <p className='' >{searchParams.filters? 'Active filters': ''}</p>
            {searchParams.filters && Object.keys(activeFilters).map(el=>(
                <>
                    <span className='filter-type'>{el} - </span>
                    {activeFilters[el].map(fi=>(
                        <span className='filter-single'>{fi} · </span>
                        ))}<br></br>
                </>

            ))}
            <p className='clear-filters' onClick={clearFilters}>{searchParams.filters? 'clear all filters': ''}</p>
            <div>
                <h5>Price</h5>
                <div class="price-button-group margin5-top-bottom">
                    <label class="checkbox-label">
                      <input type="checkbox" value="1" checked={priceFilter[1]} onChange={handlePriceChange} />
                      <span class="label-text">$</span>
                    </label>
                    <label class="checkbox-label">
                      <input type="checkbox" value="2" checked={priceFilter[2]} onChange={handlePriceChange} />
                      <span class="label-text">$$</span>
                    </label>
                    <label class="checkbox-label">
                      <input type="checkbox" value="3" checked={priceFilter[3]} onChange={handlePriceChange} />
                      <span class="label-text">$$$</span>
                    </label>
                    <label class="checkbox-label">
                      <input type="checkbox" value="4" checked={priceFilter[4]} onChange={handlePriceChange} />
                      <span class="label-text">$$$$</span>
                    </label>
                </div>
            </div>
            <div class='features-button-group flex-col margin5-top-bottom push-text'>
                <h5>Business Features</h5>
                {features && features.map(el=>(
                    <label className="filter-button">
                        <input  type="checkbox" value={el} checked={featuresObj[el]} onChange={handleFeatureChange} />
                        <span  class="">{el}</span>
                    </label>
                ))}
            </div>
            <div class='city-button-group flex-col margin5-top-bottom push-text'>
                <h5>Cities</h5>
                {cities && cities.map(el=>(
                    <label className="filter-button">
                        <input  type="checkbox" value={el} checked={citiesObj[el]} onChange={handleCityChange} />
                        <span>{el}</span>
                    </label>
                ))}
            </div>
            <div class='flex-col margin5-top-bottom push-text'>
            <h5>Categories</h5>
            {categories && categories.map(el=>(
                <label className="filter-button" >
                  <input type="radio" name={el} onClick={handleCategoryChange} value={el} checked={catObj[el]}/>{el}
                </label>
            ))}
            </div>
        </div>
    )
}
