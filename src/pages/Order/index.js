import React, { useState, useEffect } from "react";
import axiosService from "../../services/configAxios";
import TdTable from "../../components/TdTable";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";

function Order() {
  const [orders, setOrders] = useState([]);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);
  const toggleMenu = (index) => {
    setOpenedMenuIndex(index === openedMenuIndex ? null : index);
  };

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
    <AdminLayout>
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">Orders</h5>
          <div className="d-flex justify-content">
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
               
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
                      orders.map((order, index)=>(
                        <TdTable
                            key={index}
                            index={index}
                            id={order.id}
                            phone_number = {order.phone_number}
                            address = {order.address}
                            payment_method = {order.payment_method}
                            total_price={order.total_price}
                            order_status={order.order_status}
                            toggleMenu={()=>toggleMenu(index)}
                            openedMenuIndex={openedMenuIndex}
                            />

                      ))
                    }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}

export default Order;
