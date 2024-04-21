import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";

const Signup = () => {
    const { signUp, updateUserProfile, sentEmailVerify, logOut } = useContext(AuthContext)
    const naviage = useNavigate();
    const [loading, setLoading] = useState(true)

    const handleSignUp = (e) => {
        setLoading(false)
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const photo = form.image.value;
        console.log(email, password, name, photo)
        signUp(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                updateUserProfile(name, photo)
                    .then(() => {
                        const userInfo = {
                            name, email
                        }
                        axios.post('https://bistro-boss-restuarant-server.onrender.com/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("User profile info updated!")
                                    //e.target.reset();
                                    //naviage('/')
                                }
                            })

                    })
                    .catch(err => console.log(err))

                sentEmailVerify()
                    .then(() => {
                        logOut()
                            .then(() => { })
                            .catch(err => console.log(err))
                        e.target.reset();
                        setLoading(true);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Send a mail for verifying your account to your email then login!!",
                            showConfirmButton: false,
                            timer: 1500
                        });

                    })
                    .catch(err => console.log(err))
            })
    }

    return (
        <>
            {!loading ? <span className="loading loading-spinner loading-lg"></span>
                : <div className="hero min-h-screen bg-base-200">
                    <Helmet>
                        <title>Bistro Boss | Sign Up</title>
                    </Helmet>
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center md:w-1/2 lg:text-left">
                            <h1 className="text-5xl font-bold">Sign Up now!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>
                        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleSignUp} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image URL</span>
                                    </label>
                                    <input type="text" name='image' placeholder="image url" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                            <p className="px-6"><small>Already have account? <Link to='/login'>Log In</Link></small></p>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>}
        </>

    );
};

export default Signup;