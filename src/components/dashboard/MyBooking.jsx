import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "../../utils/useAxiosSecure";
import { AuthContext } from "../authentication/AuthProvider";
import { FaTrashAlt } from "react-icons/fa";

const MyBooking = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { refetch, data: payment = [] } = useQuery({
        queryKey: ['payment', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payment/${user?.email}`);
            return res.data;

        }
    })
    let count = 1;
    return (
        <div>
            <h3 className="text-3xl">Total payments: {payment.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Price</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment.map(item =>
                                <tr key={item._id}>
                                    <th>{count++}</th>
                                    <td>
                                        {item?.price}
                                    </td>
                                    <td>{item?.transactionId}</td>
                                    <td>{item?.status}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                                    </th>
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooking;