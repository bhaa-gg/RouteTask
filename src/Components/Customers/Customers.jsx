import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Customer from '../Customer/Customer'
import { setChartData } from '../../Redux/customers-slice'

const Customers = () => {
    const customerData = useSelector(store => store.customersReducer)
    const [Customers_Data, set_Customers_Data] = useState(customerData.customersTransactions)
    const dispatch = useDispatch()

    const set_Chart_Data = (data) => {
        dispatch(setChartData(data))
    }
    const Search_By_Name = (name = "") => {
        const filterName = customerData?.customersTransactions?.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
        set_Customers_Data(filterName)
    }


    const Search_By_Amount = (amount = "") => {
        const filterAmount = customerData?.customersTransactions?.filter(user => {
            return user.userTrans.find(userAmount => {
                return userAmount.amount == Number(amount)
            })
        })
        amount == "" ? set_Customers_Data(customerData?.customersTransactions) : set_Customers_Data(filterAmount)
    }

    useEffect(() => {
        set_Customers_Data(customerData.customersTransactions)
    }, [customerData.customersTransactions])


    return (
        <div className='container ' >
            <div className="inputsFilteration gap-5  md:flex ">
                <input onChange={(e) => Search_By_Name(e.target.value)} type="text" className='form-control my-5 md:m-0 ' placeholder='Search By Name' />
                <input onChange={(e) => Search_By_Amount(e.target.value)} type="number" min={1} className='form-control my-5 md:m-0 ' placeholder='Search By Amount' />
            </div>
            {
                !Customers_Data?.length ? <h1 className='text-center text-white'>Sorry No Data Matches !!!!!! </h1> : Customers_Data?.map((customer, id) => {
                    return <Customer set_Chart_Data={set_Chart_Data} key={customer.id} customer={customer} />
                })
            }

        </div>
    )
}

export default Customers
