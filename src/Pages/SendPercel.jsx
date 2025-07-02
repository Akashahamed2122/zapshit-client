import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

const PromiseData = fetch('serviceCenter.json').then(res => res.json());

const SendParcel = () => {
  const data = use(PromiseData);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [pendingData, setPendingData] = useState(null);
  const type = watch('parcelType');

  // 🔥 Extract unique divisions dynamically
  const uniqueDivisions = Array.from(new Set(data.map(item => item.region)));

  const calculateCost = (data) => {
    const baseCost = data.parcelType === 'document' ? 50 : 100;
    const weightCost = data.parcelType === 'non-document' && data.weight
      ? parseFloat(data.weight) * 20
      : 0;
    const centerFee = data.receiverServiceCenter === data.senderServiceCenter ? 0 : 30;
    return baseCost + weightCost + centerFee;
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data);
    setPendingData({ ...data, cost });

    toast((t) => (
      <div className="p-4 space-y-2 text-sm">
        <h3 className="text-lg font-bold">Delivery Cost: ৳{cost.toFixed(2)}</h3>
        <p>Do you want to confirm and save this parcel?</p>
        <div className="flex justify-end gap-2">
          <button className="btn btn-sm btn-ghost" onClick={() => toast.dismiss(t.id)}>Cancel</button>
          <button className="btn btn-sm btn-primary" onClick={() => {
            handleConfirm();
            toast.dismiss(t.id);
          }}>Confirm</button>
        </div>
      </div>
    ));
  };

  const handleConfirm = () => {
    if (!pendingData) return;

    const savedParcel = {
      ...pendingData,
      creation_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };

    console.log('✅ Parcel Saved:', savedParcel);
    toast.success('Parcel information saved successfully!');
    reset();
    setPendingData(null);
  };

  return (
    <div className="w-12/12 mx-auto my-12 px-6 py-10 bg-white rounded-xl shadow-md">
      <Toaster />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary">Send a Parcel</h1>
        <p className="text-gray-500 mt-2">Fill in parcel, sender and receiver details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* Parcel Info */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">📦 Parcel Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <p className="mb-1 font-medium">Parcel Type</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="document"
                    {...register("parcelType", { required: true })}
                    className="radio radio-primary"
                  />
                  <span>Document</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("parcelType", { required: true })}
                    className="radio radio-primary"
                  />
                  <span>Non-Document</span>
                </label>
              </div>
              {errors.parcelType && (
                <p className="text-red-500 text-sm mt-1">Please select a type</p>
              )}
            </div>

            <div>
              <input
                {...register("title", { required: true })}
                placeholder="Parcel Title"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <input
                type="number"
                step="0.1"
                {...register("weight")}
                placeholder="Weight (kg)"
                className="input input-bordered w-full"
                disabled={type !== "non-document"}
              />
            </div>
          </div>
        </section>

        {/* Sender & Receiver Info */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender Info */}
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">👤 Sender Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <input {...register("senderName", { required: true })} placeholder="Sender Name" className="input input-bordered w-full" />
                <input {...register("senderContact", { required: true })} placeholder="Contact Number" className="input input-bordered w-full" />
                <select {...register("senderRegion", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Division</option>
                  {uniqueDivisions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select {...register("senderServiceCenter", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Service Center</option>
                  {data.map((center, index) => (
                    <option key={index} value={center.city}>
                      {center.city} - {center.district}
                    </option>
                  ))}
                </select>
                <input {...register("senderAddress", { required: true })} placeholder="Full Address" className="input input-bordered w-full" />
                <input {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="input input-bordered w-full" />
              </div>
            </div>

            {/* Receiver Info */}
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">📥 Receiver Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
                <input {...register("receiverContact", { required: true })} placeholder="Contact Number" className="input input-bordered w-full" />
                <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Division</option>
                  {uniqueDivisions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select {...register("receiverServiceCenter", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Service Center</option>
                  {data.map((center, index) => (
                    <option key={index} value={center.city}>
                      {center.city} - {center.district}
                    </option>
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
