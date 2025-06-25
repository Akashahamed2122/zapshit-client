import { useLoaderData } from "react-router";
import BangladeshMap from "./BangladeshMap";


const Coverage = () => {

    const serviceCenters = useLoaderData()
    console.log(serviceCenters)


  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-primary mb-4">We are available in 64 districts</h1>

      {/* Search box (coming later) */}
      {/* <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search for a district..."
          className="input input-bordered w-full max-w-md"
        />
      </div> */}

      {/* Map */}
      <BangladeshMap serviceCenters={serviceCenters} />
    </div>
  );
};

export default Coverage;
