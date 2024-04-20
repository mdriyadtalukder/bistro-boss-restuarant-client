import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import SectionTitle from "../../SectionTitle";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Item = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const { data, refetch } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/menu/${id}`);
            return res.data;
        }
    });

    const [image, setImage] = useState('');


    useEffect(() => {
        if (data) {
            setImage(data.image);
        }
    }, [data]);

    const updateHandler = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const recipe = form.recipe.value;
        //const image = form.image.value;
        const price = form.price.value;
        const category = form.category.value;
        const menuItem = {
            name, recipe, image, category, price
        }
        const menuRes = await axiosSecure.patch(`/menu/${data?._id}`, menuItem)
        console.log(menuRes.data);
        if (menuRes.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "This item has been Updated",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    return (
        <div>

            <SectionTitle heading='Update that item' subTitle='Refresh info'></SectionTitle>
            <div className="flex justify-center items-center my-6">
                <div className="card md:w-full max-w-lg shadow-2xl bg-base-100">
                    <form onSubmit={updateHandler} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name*</span>
                            </label>
                            <input type="text" name='name' defaultValue={data?.name} placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe*</span>
                            </label>
                            <input type="text" defaultValue={data?.recipe} name='recipe' placeholder="recipe" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image file*</span>
                            </label>
                            <input onChange={(e) => setImage(e.target.value)} type="file" name="image" className="file-input file-input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select name="category" className="select select-bordered w-full max-w-xs" required>
                                <option selected={data?.category === ''}>Selected</option>
                                <option selected={data?.category === 'salad'}>salad</option>
                                <option selected={data?.category === 'pizza'}>pizza</option>
                                <option selected={data?.category === 'soup'}>soup</option>
                                <option selected={data?.category === 'dessert'}>dessert</option>
                                <option selected={data?.category === 'drinks'}>drinks</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number" defaultValue={data?.price} name="price" placeholder="price" className="input input-bordered" required />
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

export default Item;