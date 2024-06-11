import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosService from "../../services/configAxios";
import { useForm } from "react-hook-form"
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosService.post("/login", { email, password });
            console.log('User data', response.data)
            if (response.data.user) {
                // Save to localStorage
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // Navigate to the homepage
                setEmail("");
                setPassword("");
                navigate("/categories");
            } else {
                console.log(response.data.error);
            }
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    };

    return (
        <section className="background-radial-gradient overflow-hidden">
            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-5">
                    <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                        <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                            Welcome to  <br />
                            <span style={{ color: "hsl(218, 81%, 75%)", fontSize: '8rem' }}>V-splush</span>
                        </h1>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        <div className="form-lg">
                            <div className="card bg-glass form-login">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form onSubmit={handleLogin}>
                                        <div class="row">

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="form3Example4">Email address</label>
                                            </div>
                                            {/* </div> */}

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-4">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" defaultChecked />
                                                <label className="form-check-label" htmlFor="form2Example33">
                                                    Subscribe to our newsletter
                                                </label>
                                            </div>

                                            {errors.length > 0 && (
                                                <div className="alert alert-danger">
                                                    {errors.map((error, index) => (
                                                        <p key={index}>{error.msg}</p>
                                                    ))}
                                                </div>
                                            )}

                                            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                                                Sign in
                                            </button>

                                            <div className="text-center">
                                                <p>or sign in with:</p>
                                                <button type="button" className="btn btn-link btn-floating mx-1">
                                                    <i className="fab fa-facebook-f"></i>
                                                </button>

                                                <button type="button" className="btn btn-link btn-floating mx-1">
                                                    <i className="fab fa-google"></i>
                                                </button>

                                                <button type="button" className="btn btn-link btn-floating mx-1">
                                                    <i className="fab fa-twitter"></i>
                                                </button>

                                                <button type="button" className="btn btn-link btn-floating mx-1">
                                                    <i className="fab fa-github"></i>
                                                </button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
