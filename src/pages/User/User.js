import React, { useState, useEffect } from "react";
import axiosService from "../../services/configAxios";
import "./User.css";
import UserItem from '../../components/UserItem';
import { Modal, message, Pagination } from "antd";
import AdminLayout from "../../layouts/AdminLayout";

const User = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const numEachPage = 8;
  const [page, setPage] = useState({ minValue: 0, maxValue: numEachPage });

  const getUserData = async () => {
    try {
      const response = await axiosService.get("/show-all-users");
      setUsers(response.data.data);
    } catch (error) {
      alert("Something went wrong ", error);
    }
  };

  const handleStatusChange = (id, newStatus, messageContent, isError) => {
    if (isError) {
      setErrorMessage(messageContent);
      setIsErrorModalVisible(true);
    } else {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, status: newStatus } : user))
      );
      setSuccessMessage(messageContent);
      setIsSuccessModalVisible(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  const handleChange = (value) => {
    setPage({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };

  return (
    <AdminLayout>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card">
            <h5 className="card-header">Users</h5>
            <div className="table-responsive text-nowrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>User name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Date of birth</th>
                    <th>Address</th>
                    <th>Avatar</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {users.length > 0 &&
                    users
                      .slice(page.minValue, page.maxValue)
                      .map((user, index) => (
                        <UserItem
                          key={user.id}
                          id={user.id}
                          index={index + 1 + page.minValue}
                          username={user.name}
                          phone={user.phone}
                          email={user.email}
                          dob={user.date_of_birth}
                          address={user.address}
                          avatar_url={user.image_url}
                          role={user.role_id}
                          status={user.status}
                          onStatusChange={handleStatusChange}
                        />
                      ))}

                </tbody>
              </table>
              <Pagination
                defaultCurrent={1}
                defaultPageSize={numEachPage}
                onChange={handleChange}
                total={users.length}
                className="blog"
              />
            </div>
          </div>
        </div>
        <Modal className="error"
          title="Error"
          open={isErrorModalVisible}
          onOk={() => setIsErrorModalVisible(false)}
        >
          <p>{errorMessage}</p>
        </Modal>
        <Modal
          title="Success"
          open={isSuccessModalVisible}
          onOk={() => setIsSuccessModalVisible(false)}
        >
          <p>{successMessage}</p>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default User;
