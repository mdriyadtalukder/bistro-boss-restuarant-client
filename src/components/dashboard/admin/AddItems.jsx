import { useState } from "react";
import SectionTitle from "../../SectionTitle";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const [category, setCategory] = useState('');
    const axiosSecure = useAxiosSecure()

    const addHandler = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const recipe = form.recipe.value;
        const price = form.price.value;

        //---------in imgbb update image-------------------------
        const forms = new FormData(e.target); //ei vabeo data neye jai input field theke
        const image = forms.get('image');
        const data = new FormData();
        data.append('image', image)
        const res = await axios.post(image_hosting_api, data)
        //-----------------------------------------------------------

        if (res?.data?.success) {
            const menuItem = {
                name,
                recipe,
                image: res?.data?.data?.display_url,
                category, price
            }
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                e.target.reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "This item has been added",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

    }

    return (
        <div>

            <SectionTitle heading='Add a new item' subTitle='Whats new?'></SectionTitle>
            <div className="flex justify-center items-center my-6">
                <div className="card md:w-full max-w-lg shadow-2xl bg-base-100">
                    <form onSubmit={addHandler} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name*</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe*</span>
                            </label>
                            <input type="text" name='recipe' placeholder="recipe" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image file*</span>
                            </label>
                            <input type="file" name="image" className="file-input file-input-bordered w-full max-w-xs" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-full max-w-xs" required>
                                <option disabled selected>Selected</option>
                                <option>salad</option>
                                <option>pizza</option>
                                <option>soup</option>
                                <option>dessert</option>
                                <option>drinks</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number" name="price" placeholder="price" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddItems;