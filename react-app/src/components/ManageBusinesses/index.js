import { useEffect, useState } from 'react';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUserBusinesses } from '../../store/business';
import { NavLink, Route, useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteBusines from '../DeleteBusiness';
import './index.css'

export default function ManageBusinesses({ businesses, isOwner }){
    // const dispatch = useDispatch()
    // const {userId} = useParams()
    // const businesses = useSelector((state) => Object.values(state.business.all_businesses))
    // useEffect(() => {
    //     dispatch(getUserBusinesses(userId))
    // },[dispatch, userId])

    if (!businesses[0]) return null

    return(
        <>
        {!businesses[0] ? (null) : (
                <div className='forfirst'>
                    {businesses.map((business) => {
                        return (
                            <nav key={business.id} className='forNewDiv'>
                                <div className='forNav' >
                                    <div >
                                        <div className='spotClass' >
                                            {business.previewimage ? (<img src={business.previewimage.url} className='forImage'></img>) : (<p>No image provided</p>)}

                                        </div>
                                        <div className='forInside'>
                                            <div>{business.city}, {business.state}</div>
                                            <div>{business.name}</div>
                                        </div>
                                        <div className='forInside'>
                                            {/* <div>{business.price}</div> */}
                                            {isOwner && <NavLink to={`/businesses/${business.id}/edit`}><button className='default-button curs' >Update</button></NavLink>}
                                            {/* <div><OpenModalButton buttonText="Delete" modalComponent={<DeleteSpot spotId={spot.id} />} /></div> */}
                                            {isOwner && <div><OpenModalButton nameClass={'default-button curs rd-bg'} buttonText="Delete" modalComponent={<DeleteBusines businessId={business.id} />} /></div>}
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        )
                    })}
                </div>
        )}
        </>

    )
}
