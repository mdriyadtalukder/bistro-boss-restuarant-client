import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from './AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SocialLogin from './SocialLogin';
import Swal from 'sweetalert2';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true)
    const from = location.state?.from?.pathname || '/'
    const { logIn, logOut } = useContext(AuthContext)
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (e) => {
        setLoading(false)
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        logIn(email, password)
            .then(result => {
                const user = result.user;
                if (!result?.user?.emailVerified) {
                    logOut()
                        .then(() => { })
                        .catch(err => console.log(err))
                    e.target.reset();
                    setLoading(true);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Verify Your account first then login",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    console.log(user);
                    setLoading(true);
                    navigate(from, { replace: true });
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Log in successfully!!",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }

            })


    }
    const handleCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value) == true) {
            setDisabled(false)
        }

        else {
            setDisabled(true)
            alert('Captcha Does Not Match!!');
        }
    }
    return (
        <>
            {!loading ? <span className="loading loading-spinner loading-lg"></span> : <div className="hero min-h-screen bg-base-200">
                <Helmet>
                    <title>Bistro Boss | Log In</title>
                </Helmet>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleCaptcha} type="text" name="captcha" placeholder='type above captcha text' className="input input-bordered" required />

                            </div>
                            <div className="form-control mt-6">
                                <button disabled={disabled} className="btn btn-primary">Log In</button>
                            </div>
                        </form>
                        <p className='px-6'><small>New here? <Link to='/signup'>Sign Up</Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Login;