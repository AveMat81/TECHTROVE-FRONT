import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import fetchOrderById from "../../redux/actions/fetchOrderById"
import OrderCard from "../Cards/OrderCard";
import { Link } from "react-router-dom";



const  MyOrders = ()=>{
    
    //     //const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();    
    const order = useSelector((state) => state.orderR)
    console.log(order);
    
        useEffect(() => {
                // Asegúrate de que dispatch esté definido
                if (dispatch) {
                      dispatch(fetchOrderById(id));
                    }
                  }, [dispatch, id]);
            
            

    return (

        <div>
            <div>
            <h2>Order Details</h2>
            {order.orderId.map((order, i) => (
            <OrderCard key={i} 
            paymentId={order.paymentId} 
            status={order.status}
            total={order.total} 
            paymentMethod={order.paymentMethod} 
                product={order.products[0]} 

                />
            ))} 

        </div>
                <Link to={"/rating"}>
                <button>

                </button>

                </Link>
        </div>
    )
}

export default MyOrders;
