import React, { use, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';

// SweetAlert setup
const MySwal = withReactContent(Swal);

// Fetch service center data
const serviceCentersPromise = fetch('serviceCenter.json').then(res => res.json());

const divisions = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Mymensingh',
  'Rangpur',
];

const SendParcel = () => {
  const serviceCenters = use(serviceCentersPromise); // Suspense for service center loading

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const {user}=useContext(AuthContext)
  const axiosSecure = UseAxiosSecure()

  const [pendingData, setPendingData] = useState(null);
  const type = watch('parcelType');

  const calculateCost = (data) => {
    const weight = parseFloat(data.weight) || 0;
    const isWithinCity = data.receiverServiceCenter === data.senderServiceCenter;

    let base = 0, weightCharge = 0, outOfCityFee = 0;

    if (data.parcelType === 'document') {
      base = isWithinCity ? 60 : 80;
    } else if (data.parcelType === 'non-document') {
      if (weight <= 3) {
        base = isWithinCity ? 110 : 150;
      } else {
        weightCharge = weight * 40;
        outOfCityFee = isWithinCity ? 0 : 40;
      }
    }

    return {
      base,
      weightCharge,
      outOfCityFee,
      total: base + weightCharge + outOfCityFee,
    };
  };

const generateTrackingId = () => {
  return 'TRK-' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

const onSubmit = async (data) => {
  const breakdown = calculateCost(data);
  setPendingData({ ...data, breakdown });

  const result = await MySwal.fire({
    title: 'Confirm Parcel Submission',
    html: `
      <div style="text-align:left">
        <p>📦 <strong>Base:</strong> ৳${breakdown.base}</p>
        <p>⚖️ <strong>Weight Charge:</strong> ৳${breakdown.weightCharge}</p>
        <p>🚚 <strong>Out of City Fee:</strong> ৳${breakdown.outOfCityFee}</p>
        <hr style="margin:10px 0;" />
        <p><strong>Total Cost:</strong> ৳${breakdown.total}</p>
      </div>
    `,
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: '💳 Process to Payment',
    denyButtonText: '📝 Edit',
    cancelButtonText: 'Cancel',
  });

  if (result.isConfirmed) {
    const savedParcel = {
      ...data,
      cost: breakdown.total,
      creation_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      user_email: user?.email,
      user_name: user?.displayName,
      tracking_id: generateTrackingId(),
    };

    console.log('✅ Parcel Saved:', savedParcel);

    axiosSecure.post(`/parcels`,savedParcel)
      .then(res=>{
       
        console.log(res.data)
        if(res.data.insertedId){
           // redeirect to the payment pages
                    MySwal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      text: `Tracking ID: ${savedParcel.tracking_id} - Your parcel has been saved.`,
      timer: 3000,
      showConfirmButton: false,
    });

        }
      })

   

    reset();
    setPendingData(null);
  } else if (result.isDenied) {
    reset(data);
    setPendingData(null);
  }
};


  return (
    <div className="w-12/12 mx-auto my-12 px-6 py-10 bg-white rounded-xl shadow-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary">Send a Parcel</h1>
        <p className="text-gray-500 mt-2">Fill in parcel, sender and receiver details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Parcel Info */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">📦 Parcel Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Parcel Type */}
            <div>
              <p className="mb-1 font-medium">Parcel Type</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" value="document" {...register("parcelType", { required: true })} className="radio radio-primary" />
                  <span>Document</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="non-document" {...register("parcelType", { required: true })} className="radio radio-primary" />
                  <span>Non-Document</span>
                </label>
              </div>
              {errors.parcelType && <p className="text-red-500 text-sm mt-1">Please select a type</p>}
            </div>

            {/* Parcel Title */}
            <div>
              <input {...register("title", { required: true })} placeholder="Parcel Title" className="input input-bordered w-full" />
            </div>

            {/* Weight */}
            <div>
              <input type="number" step="0.1" {...register("weight")} placeholder="Weight (kg)" className="input input-bordered w-full" disabled={type !== "non-document"} />
            </div>
          </div>
        </section>

        {/* Sender & Receiver Info */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender */}
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">👤 Sender Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <input {...register("senderName", { required: true })} placeholder="Sender Name" className="input input-bordered w-full" />
                <input {...register("senderContact", { required: true })} placeholder="Contact Number" className="input input-bordered w-full" />
                <select {...register("senderRegion", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Division</option>
                  {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <select {...register("senderServiceCenter", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Service Center</option>
                  {serviceCenters.map((s, idx) => (
                    <option key={idx} value={`SC-${s.city}`}>SC-{s.city}</option>
                  ))}
                </select>
                <input {...register("senderAddress", { required: true })} placeholder="Full Address" className="input input-bordered w-full" />
                <input {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="input input-bordered w-full" />
              </div>
            </div>

            {/* Receiver */}
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">📥 Receiver Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
                <input {...register("receiverContact", { required: true })} placeholder="Contact Number" className="input input-bordered w-full" />
                <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Division</option>
                  {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <select {...register("receiverServiceCenter", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Service Center</option>
                  {serviceCenters.map((s, idx) => (
                    <option key={idx} value={`SC-${s.city}`}>SC-{s.city}</option>
                  ))}
                </select>
                <input {...register("receiverAddress", { required: true })} placeholder="Full Address" className="input input-bordered w-full" />
                <input {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="input input-bordered w-full" />
              </div>
            </div>
          </div>
        </section>

        <button type="submit" className="btn btn-primary w-full text-lg font-bold">Submit Parcel</button>
      </form>
    </div>
  );
};

export default SendParcel;
