import { useEffect, useState } from "react";
import axiosService from "../../services/configAxios";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";
function ShowContact() {
  const [contacts, setContact] = useState([]);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenedMenuIndex(index === openedMenuIndex ? null : index);
  };

  const getAllContact = async () => {
    try {
      const response = await axiosService.get(`/admin-contact`);
      setContact(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.log("Error get all contact", error);
    }
  };
  useEffect(() => {
    getAllContact();
  }, []);

  return (
 
    <AdminLayout>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card">
            <h5 className="card-header title-contact">Contacts</h5>
            <div className="table-responsive text-nowrap">
              <table className="table">
                <thead>
                  <tr>
                    <th className="title-contact">Name</th>
                    <th className="title-contact">Email</th>
                    <th className="title-contact">Subject</th>
                    <th className="title-contact">Message</th>
                    <th className="title-contact">Contact Status</th>
                    <th className="title-contact">Action</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {contacts.map((contact, index) => (
                    <tr key={contact.index}>
                      <td>
                        <strong>{contact.name}</strong>
                      </td>
                      <td>{contact.email}</td>
                      <td>{contact.subject}</td>
                      <td>{contact.message}</td>
                      <td>{contact.contact_status}</td>
                      <td>
                        <div className="dropdown">
                          <button
                            type="button"
                            className={`btn p-10 dropdown-toggle hide-arrow ${
                              index === openedMenuIndex ? "show" : ""
                            }`}
                            data-bs-toggle="dropdown"
                            onClick={() => toggleMenu(index)}
                          >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          <div
                            className={`dropdown-menu ${
                              index === openedMenuIndex ? "show" : ""
                            }`}
                          >
                            <Link
                              to={`/update-contact/${contact.id}`}
                              className="dropdown-item"
                            >
                              <i className="fa-solid fa-pen"></i> Edit
                            </Link>

                            <a className="dropdown-item" href="#!">
                              <i className="fa-solid fa-trash"></i>
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </AdminLayout>
  );
}

export default ShowContact;
