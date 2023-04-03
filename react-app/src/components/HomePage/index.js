import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearRecentActivity, getRecentActivity } from '../../store/recentActivity';
import { getBusinesses } from '../../store/business'
import './index.css'
import ReviewTile from './ReviewTile';
import BusinessTile from './BusinessTile'
import CategoriesGrid from '../CategoriesGrid';

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}


const HomePage = () => {
  const dispatch = useDispatch()
  let recentActivity = useSelector(state => state.recentActivity);

  useEffect(() => {
    dispatch(getBusinesses());
    dispatch(getRecentActivity());
    return () => dispatch(clearRecentActivity())
  }, [dispatch]);

  if (recentActivity.length === 0) {
    return (
      <div>Loading recent activity...</div>
    );
  }

  recentActivity = shuffleArray(recentActivity)

  return (
    <>
      <section id='homePage'>
          <div id='homePage-previewImage'>
              <img src='https://i.imgur.com/HnO4Ygx.jpg' alt='Preview image' />
          </div>
      </section>
      <div className='recent-activity-title'>Recent Activity</div>
      <section className='recent-activity-container'>
      <div className='recent-activity-tiles'>
          {recentActivity.map(element => {
            if (element.type === 'review') {
              return <ReviewTile review={element} key={element.id}/>
            } else if (element.type === 'business') {
              return <BusinessTile business={element} key={element.id}/>
            } else {
              return null;
            }
          })}
        </div>
      </section>
      <section className='categories-tiles'>
        <h2>Catergories</h2>
        <CategoriesGrid />
      </section>
    </>
  )
};

export default HomePage;
