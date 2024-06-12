import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosService from "../../services/configAxios";
import { useForm } from "react-hook-form";
import "./Login.css";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverErrors, setServerErrors] = useState([]);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axiosService.post("/login", data);
            console.log('User data', response.data);
            if (response.data.user) {
                // Save to localStorage
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // Navigate to the homepage
                navigate("/categories");
            } else {
                console.log(response.data.error);
            }
        } catch (e) {
            if (e.response) {
                if (e.response.status === 422) {
                    setServerErrors(e.response.data.errors);
                } else {
                    setServerErrors([e.response.data.message]);
                }
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
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                                                />
                                                <label className="form-label" htmlFor="form3Example4">Email address</label>
                                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="form3Example5"
                                                    className="form-control"
                                                    {...register("password", { required: "Password is required" })}
                                                />
                                                <label className="form-label" htmlFor="form3Example5">Password</label>
                                                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-4">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" defaultChecked />
                                                <label className="form-check-label" htmlFor="form2Example33">
                                                    Subscribe to our newsletter
                                                </label>
                                            </div>

                                            {serverErrors.length > 0 && (
                                                <div className="alert alert-danger">
                                                    {serverErrors.map((error, index) => (
                                                        <p key={index}>{error}</p>
                                                    ))}
                                                </div>
                                            )}

                                            <button type="submit" className="btn btn-primary btn-block mb-4">
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
