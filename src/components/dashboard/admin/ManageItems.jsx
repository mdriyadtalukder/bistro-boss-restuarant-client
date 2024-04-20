import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const axiosSecure = useAxiosSecure();
    const { data: items = [], refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosSecure.get('/menu');
            return res.data;
        }
    });
    let count = 1;

    const handleDeleteItem = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/menu/${item?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${item?.name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <SectionTitle heading='Manage all item' subTitle='Hurry up!'></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item => <tr key={item?._id}>
                                <th>{count++}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item?.name}
                                </td>
                                <td>{item?.price}</td>
                                <th>
                                    <Link to={`/dashboard/manageitem/${item?._id}`}> <button className="btn btn-ghost btn-lg"><FaEdit className="text-orange-600"></FaEdit></button></Link>
                                </th>
                                <th>
                                    <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                                </th>
                            </tr>)
                        }





                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;