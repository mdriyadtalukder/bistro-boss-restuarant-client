import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const naviage = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user)
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                }
                axios.post('https://bistro-boss-restaurant-server-nu.vercel.app/users', userInfo)
                    .then(res => {

                        console.log(res.data)
                        naviage('/')

                    })

            })
    }
    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn w-full">
                    <FaGoogle></FaGoogle>
                    Sign Up With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;