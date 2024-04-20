import { useContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../utils/useAxiosSecure";
import useCart from "../../utils/useCart";

const FoodCart = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure()
    const [,refetch]=useCart();
    const addToCartHandler = () => {
        if (user && user.email) {

            const cartItem = {
                cartId: _id,
                email: user?.email,
                name,
                image,
                price,
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res?.data?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart!`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }

                }
                )
        }
        else {
            Swal.fire({
                title: "You are not logged in!",
                text: "Please log in first to add item to cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log in!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4 ">{price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={addToCartHandler} className="btn btn-outline bg-slate-200 border-0 border-b-4 mt-4 border-orange-400">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;