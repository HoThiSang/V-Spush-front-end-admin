import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import "./home.css";
import axiosService from "../services/configAxios";

function Home() {
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [blogs, setBlogs] = useState(0);
  const [contacts, setContacts] = useState(0);
  const [category, setCategory] = useState(0);
  const [users, setUsers] = useState(0);

  const getTotalData = async () => {
    try {
      const response = await axiosService.get("/admin-home-page");
      console.log(response.data);
      setBlogs(response.data.postCount);
      setProducts(response.data.productCount);
      setCategory(response.data.categoryCount);
      setContacts(response.data.contactCount);
      setUsers(response.data.userCount);
      setOrders(response.data.orderCount);
    } catch (error) {
      alert("Something wrong !");
    }
  };

  useEffect(() => {
    getTotalData();
  }, []);

  return (
    <AdminLayout>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="container mt-5">
            <div className="row home-wrapper">
              <div className="col-md-3 item-card">
                <div>
                  <i className="fa-brands fa-product-hunt icon-home icon1"></i>
                  <h4 className="heading-1">{products} Products</h4>
                </div>
              </div>
              <div className="col-md-3 item-card">
                <div>
                  <i className="fa-solid fa-user icon-home icon2"></i>
                  <h4 className="heading-2">{users} Users</h4>
                </div>
              </div>
              <div className="col-md-3 item-card">
                <div>
                  <i className="fa-solid fa-list icon-home icon3"></i>
                  <h4 className="heading-3">{orders} Orders</h4>
                </div> 
              </div>
              <div className="col-md-3 item-card">
                <div>
                  <i className="fa-solid  fa-envelope icon-home icon4"></i>
                  <h4 className="heading-4">{contacts} Contacts</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Home;
