import React from "react";
import ModelViewer from "./ModelViewer";
const Threed = () => {
  return (
    <div className="flex px-10  justify-between h-svh items-center">
      <div className=" flex justify-center items-center  w-full h-full">
      <h1 className="text-4xl font-bold  text-[#8d8c8c] mt-10">
  Step into Style:
  <h1 >Discover the Perfect Pair at our Shoe Haven!</h1> 
</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <ModelViewer />
        <h1 className="text-red-500 font-bold w-full flex justify-center">Click an drag to see 3d view</h1>
      </div>
    </div>
  );
};

export default Threed;
