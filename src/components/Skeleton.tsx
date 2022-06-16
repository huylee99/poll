const SkeletonPollPage = () => {
  return (
    <div className="w-full bg-slate-800 border-t-4 border-pink-600 rounded-md p-8">
      <div className="skeleton w-full h-8 rounded-md mb-4"></div>
      <div className="skeleton w-full h-6 rounded-md"></div>
    </div>
  );
};

const SkeletonPollCard = () => {
  return (
    <div className="w-full bg-slate-800 p-5 rounded-md my-3">
      <div className="skeleton w-full h-4 rounded-md mb-4"></div>
      <div className="skeleton w-full h-6 rounded-md"></div>
    </div>
  );
};

export { SkeletonPollPage, SkeletonPollCard };
