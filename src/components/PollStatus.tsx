const PollStatus = () => {
  return (
    <div className="flex items-center" role="status">
      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
      <span className="text-slate-400 font-medium">on-going</span>
    </div>
  );
};

export default PollStatus;
