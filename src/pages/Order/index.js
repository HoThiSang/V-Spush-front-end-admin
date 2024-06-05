import React, { useState } from "react"; 

function Order() {
  
  
  
  return (
    <div class="content-wrapper">
      <div class="container-xxl flex-grow-1 container-p-y">
        <div class="card">
          <h5 class="card-header">Users</h5>
          <div class="d-flex justify-content">
            <a class="btn btn-primary " href="#!" id="">
              Create new
            </a>
          </div>
          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
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
              <tbody class="table-border-bottom-0">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Order