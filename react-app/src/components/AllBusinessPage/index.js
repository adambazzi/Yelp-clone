import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBusinesses, loadFiltered } from '../../store/business'
import { useSearchParams } from '../../context/SearchParamsContext';
import BusinessTile from './BusinessTile'
import BusinessesMap from './BusinessesMap'
// import FilterForm from './FilterForm'
import './index.css'
import filterResults from '../../utils/searchAndFilters';
import FilterSearch from '../FilterSearch';
import NewBusinessTile from './NewBusinessTile';

const AllBusinessPage = () => {
  const {searchParams, setSearchParams} = useSearchParams();
  const dispatch = useDispatch();
  const businesses = useSelector(state => state.business.all_businesses);
  const filteredBusinesses = useSelector(state => state.business.filtered_businesses);
  const [businessList,setBusinessList] = useState([])

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);

  useEffect(()=>{
    if(searchParams.filters && businesses){
      setBusinessList( filterResults(Object.values(businesses),searchParams.search,searchParams.query))
    } else{
      dispatch(loadFiltered(Object.values(businesses)))
    }
  },[searchParams])

  useEffect(()=>{
    dispatch(loadFiltered(businessList))
  },[businessList])

  if (!businesses || !filteredBusinesses) return null

  return (
    <div id='business-container'>
      <section id='business-filter'>
        <FilterSearch />
      </section>
      <section id='business-gallery'>
          <div id='business-tiles'>
          {searchParams.filters && filteredBusinesses? Object.values(filteredBusinesses).map(business => <NewBusinessTile business={business} key={business.id}/>):Object.values(businesses).map(business => <NewBusinessTile business={business} key={business.id}/>)}
          </div>
      </section>
      <section id='business-map'>
          <BusinessesMap businesses={searchParams.filters? Object.values(filteredBusinesses):Object.values(businesses) } />
          {/* <BusinessesMap businesses={Object.values(businesses)} /> */}
      </section>
    </div>
  )
};

export default AllBusinessPage;
