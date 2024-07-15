import React from 'react'
import { FaChartLine } from "react-icons/fa6";

const Customer = ({ customer, set_Chart_Data }) => {
    return (
        <div className="row border border-white my-4 bg-[#3FA2F6] p-2 rounded-2xl flex items-center ">
            <div className='col-md-1 '>
                <div className="">
                    <h1> {customer.id}</h1>
                </div>
            </div>
            <div className='col-md-3 '>
                <div className="">
                    <h2> {customer.name}</h2>
                </div>
            </div>
            <div className='col-md-7 '>
                <div className="">
                    {
                        customer?.userTrans?.map((ut, id) => {
                            return <div key={id} className=" rounded-2xl p-3 border border-white my-2 bg-[#0F67B1] text-white">
                                <h3>Date : {ut.date}</h3>
                                <h3>Amount : {ut.amount} </h3>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='col-md-1  '>
                <a href='#char' onClick={() => set_Chart_Data(customer?.userTrans)} className=" bg-[#FAFFAF] border border-black  flex items-center rounded-full cursor-pointer w-14 h-14 justify-center hover:scale-110 transition-all ">
                    <FaChartLine className='fs-4' />
                </a>
            </div>
        </div>
    )
}

export default Customer
