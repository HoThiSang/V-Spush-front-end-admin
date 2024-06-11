import React, { useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import axiosService from "../services/configAxios";

const UserItem = ({ id, username, phone, email, dob, address, avatar_url, role, status, onStatusChange }) => {
  const [userStatus, setUserStatus] = useState(status);

  const handleMenuClick = async (e) => {
    const newStatus = e.key === 'enabled' ? 'Enabled' : 'Disabled';
    try {
      const response = await axiosService.post(`/update-user-status/${id}`, { status: newStatus });
      if (response.data.message) {
        setUserStatus(newStatus);
        onStatusChange(id, newStatus, response.data.message, false);
      } else {
        onStatusChange(id, userStatus, response.data.error, true);
      }
    } catch (error) {
      onStatusChange(id, userStatus, "Something went wrong", true);
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
      <td>{username}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{dob}</td>
      <td>{address}</td>
      <td><img src={avatar_url} alt={username} width="50" /></td>
      <td>{role}</td>
      <td>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button>
            {userStatus}
          </Button>
        </Dropdown>
      </td>
    </tr>
  );
};

export default UserItem;
