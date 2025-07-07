import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { FaEye, FaTrash, FaMoneyBillWave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate()

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['my-parcels', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);  // fixed '=' here
      return res.data;
    },
  });

  const handleView = (parcel) => {
    console.log('View clicked:', parcel);
    // Show modal or redirect to details page
  };
const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      const res = await axiosSecure.delete(`/parcels/${id}`);
      if (res.data.deletedCount > 0) {
        await Swal.fire({
          title: 'Deleted!',
          text: 'The parcel has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        await refetch(); // refetch করার সময় await ব্যবহার করা জরুরি
      }
    } catch (err) {
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  }
};

  const handlePay = (id) => {
    navigate(`/dashbord/payment/${id}`)
    
     
    }

   


  return (
    <div className="overflow-x-auto p-4">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels?.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td className='max-w-180[px] truncate'>{parcel.title}</td>
              <td>
                <span className={`badge ${parcel.parcelType === 'document' ? 'badge-info' : 'badge-secondary'}`}>
                  {parcel.parcelType === 'document' ? 'Document' : 'Non-document'}
                </span>
              </td>
              <td>{new Date(parcel.creation_date).toLocaleString()}</td>
              <td>৳ {parcel.cost}</td>
              <td>
                <span className={`badge ${parcel.cost > 0 ? 'badge-success' : 'badge-error'}`}>
                  {parcel.cost > 0 ? 'Paid' : 'Unpaid'}
                </span>
              </td>
              <td>
                <div className="flex justify-center gap-2">
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() => handleView(parcel)}
                    title="View Details"
                  >
                    <FaEye />
                  </button>

                  <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => handlePay(parcel._id)}
                   
                    title="Make Payment"
                  >
                    <FaMoneyBillWave />
                  </button>

                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDelete(parcel._id)}
                    title="Delete Parcel"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {parcels?.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-gray-500">
                No parcels found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
