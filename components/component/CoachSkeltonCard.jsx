import React from "react";

const CoachSkeltonCard = () => {
  return (
    <div className="group relative bg-white p-4 border rounded-lg animate-pulse">
      {/* Image Skeleton */}
      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
        <div className="h-full w-full bg-gray-300"></div>
      </div>

      {/* Name Skeleton */}
      <div className="coaching_name text-center mt-4">
        <div className="h-4 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
        <div className="h-3 bg-gray-200 rounded-md w-1/2 mx-auto mt-2"></div>
      </div>

      {/* Placeholder for additional details */}
      {/* <div className="mt-4 p-5 flex justify-between border-t border-gray-200">
        <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
      </div> */}
    </div>
  );
};

export default CoachSkeltonCard;
