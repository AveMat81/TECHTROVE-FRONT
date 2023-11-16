import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import fetchOrderById from "../../redux/actions/fetchOrderById";
import OrderCard from "../Cards/OrderCard";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import DetailOrder from "../../views/DetailOrder";

const MyOrders = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderR);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  //const [order, setOrder] = useState(initialOrderState);

  

  useEffect(() => {
    if (dispatch) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = order.orderId.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (event, page) => {
    setCurrentPage(page); 
  };

  return (
    <div className="mb-[118px]">
      <div>
        <h2 className="text-[34px] text-black mt-[22px] mb-[21px] "> Order Details</h2>
        {currentOrders.map((order, i) => (
          <div key={i}>
          <OrderCard
            key={i}
            paymentId={order.paymentId}
            status={order.status}
            total={order.total}
            paymentMethod={order.paymentMethod}
            products={order.products}
          />
           
          </div>
        ))}
      </div>

      {/* Agregar el paginado */}
      <div className="mt-8 flex justify-center items-center relative">
        <Pagination
          count={Math.ceil(order.orderId.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#DAE2DA",
              fontSize: "20px",
            },
            "& .MuiPaginationItem-root": {
              fontSize: "17px",
              marginRight: "11px",
            },
          }}
        />
      </div>

      <Link to={"/rating"}>
        <button></button>
      </Link>
    </div>
  );
}

export default MyOrders;
