import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../utils/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure=useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });
    let count = 1;
    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/admin/${user?._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: `${user?.name} make admin succesfully!`,
                                text: "make admin.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }
    const handleDeleteUser = id => {
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

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl ">All Users</h2>
                <h2 className="text-3xl ">Total Users: {users?.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map(user =>
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <th>{count++}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <th>
                                        {
                                            user?.role === 'admin' ? 'admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-lg bg-orange-400"><FaUsers className="text-white"></FaUsers></button>
                                        }
                                    </th>
                                    <th>
                                        <button onClick={() => handleDeleteUser(user?._id)} className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;