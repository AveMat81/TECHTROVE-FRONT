import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import fetchAllOrders from "../../redux/actions/allOrders"
import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'

const OrdersFake = () => {

  const orders = useSelector((state) => state.allOrders)

  const data = orders.allOrders
  const [filtering, setFiltering] = useState("")

  const columns = [
    {
      header: "paymentId",
      accessorKey: "paymentId"
    },
    {
      header: "Total",
      accessorKey: "total"
    },
    {
      header: "Status",
      accessorKey: "status"
    }
  ]

  const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), state:{globalFilter: filtering} ,getFilteredRowModel: getFilteredRowModel(), onGlobalFilterChange: setFiltering})


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders())
  }, []);

  const handlerAllOrders = () =>{
    setFiltering("")
    
  }

  

  return (
    <div className="overflow-x-auto">
      <div className="mb-2 mt-4">
            <h1 className="text-2xl sm:text-5xl font-semibold text-gray-900 mb-4">
              All Orders
            </h1>
      </div>
      <div className="flex justify-between mr-4 ml-4 mb-2">
      <select onChange={(e) => setFiltering(e.target.value)} className={`w-2/5 p-2 rounded border border-gray-300`}>
          <option value="" disabled selected>Filter</option>
          <option value="approved" >aprooved</option>
          <option value="pending" >pending</option>
      </select>
      <button onClick={handlerAllOrders} className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">All Orders</button>
      </div>
      <table className="min-w-full divide-y divide-gray-300 pr-8 mt-6">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(HeaderGroup => (
            <tr key={HeaderGroup.paymentId}>
              {HeaderGroup.headers.map(header => (
                <th
                  key={HeaderGroup.paymentId}
                  className="py-2 px-4 text-center font-semibold"
                >
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr key={row.paymentId} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.column.id} className="py-2 px-4 pt-6">
                  
                  {(
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mb-4 mt-8'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={() => table.previousPage()}>
          Previous page       
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={() => table.nextPage()}>
          Next Page
        </button>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => table.setPageIndex(0)}>
        First Page
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
      Last Page
      </button>
    </div>
  )
}

export default OrdersFake