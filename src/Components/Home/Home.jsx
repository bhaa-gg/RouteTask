import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './../Loading/Loading';
import { getAllTransactions } from '../../Redux/customers-slice';
import Customers from '../Customers/Customers';
import Chart from './../Chart/Chart';

const Home = () => {
    const customerData = useSelector(store => store.customersReducer)
    const dispatch = useDispatch()

    const getCustomerAndTransaction = async () => {
        dispatch(getAllTransactions())
    }

    useEffect(() => {
        getCustomerAndTransaction();
    }, [])

    if (customerData.loading) return <Loading />
    return (
        <div>
            <Customers />
            <Chart />
        </div>
    )
}

export default Home
