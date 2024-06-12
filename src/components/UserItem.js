import React, { useState } from "react";
import { Dropdown, Menu, Button, message } from "antd";
import axiosService from "../services/configAxios";
import "../pages/User/User.css";

const UserItem = ({
  id,
  index,
  username,
  phone,
  email,
  dob,
  address,
  avatar_url,
  role,
  status,
  onStatusChange
}) => {
  const [userStatus, setUserStatus] = useState(status);

  const handleMenuClick = async (e) => {
    const newStatus = e.key === "enabled" ? "Enabled" : "Disabled";
    try {
      const response = await axiosService.post(`/update-user-status/${id}`, {
        status: newStatus
      });
      console.log("API Response:", response.data);
      const responseData = response.data;
      if (responseData && responseData.message) {
        setUserStatus(newStatus);
        onStatusChange(id, newStatus, responseData.message, false);
      } else {
        throw new Error(
          responseData && responseData.error
            ? responseData.error
            : "Unknown error occurred"
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        onStatusChange(
          id,
          userStatus,
          "Cannot disable user. Order not delivered",
          true
        );
      } else {
        console.error("API Error:", error);
        onStatusChange(
          id,
          userStatus,
          error.message || "Something went wrong",
          true
        );
      }
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="enabled">Enabled</Menu.Item>
      <Menu.Item key="disabled">Disabled</Menu.Item>
    </Menu>
  );

  return (
    <tr>
      <td>{index}</td>
      <td>{username}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{dob}</td>
      <td>{address}</td>
      <td>
        {avatar_url ? (
          <img src={avatar_url} alt={username} width="50" />
        ) : (
          <img
            src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
            alt="Default Avatar"
            width="50"
          />
        )}
      </td>

      <td>{role}</td>
      <td>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            style={{
              backgroundColor: userStatus === "Enabled" ? "#80ed99" : "#ef233c",
              color: "#fff"
            }}
          >
            {userStatus}
          </Button>
        </Dropdown>
      </td>
    </tr>
  );
};

export default UserItem;
