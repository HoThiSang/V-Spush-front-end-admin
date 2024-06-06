import React, { useState, useEffect } from "react";
import axiosService from "../../services/configAxios";
import userEvent from "@testing-library/user-event";
import TdTable from "../../components/TdTable";
import { Link } from "react-router-dom";

function Order() {
  const [orders, setOrders] = useState([]);

  const getOrderData = async () => {
    try {
        const response = await axiosService.get("/admin-show-all-orders");
        setOrders(response.data.data);
        console.log(response.data.data)
    } catch (error) {
      alert('Something wrong ', error) 
    }
    
  };
  useEffect(()=>{
    getOrderData();
  }, [])

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">Users</h5>
          <div className="d-flex justify-content">
            <Link to='' className="btn btn-primary btn-create-new" id="">
              Create new
            </Link>
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>User name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Payment Method</th>
                  <th>Order Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                    {
                      orders.map((order)=>(
                        <TdTable
                            id={order.id}
                            phone_number = {order.phone_number}
                            name = {order.name}
                            address = {order.address}
                            payment_method = {order.payment_method}
                            total_price={order.total_price}
                            order_status={order.order_status}
                            />
                      ))
                    }
                  
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
