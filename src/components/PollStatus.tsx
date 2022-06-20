type PollStatusProps = {
  isExpired: boolean;
};

const PollStatus = ({ isExpired }: PollStatusProps) => {
  const statusColor = isExpired ? "bg-red-500" : "bg-green-500";
  const status = isExpired ? "Ended" : "On-going";
  return (
    <div className="flex items-center" role="status">
      <div className={`w-2 h-2 rounded-full mr-2 ${statusColor}`}></div>
      <span className="text-slate-400 font-medium">{status}</span>
    </div>
  );
};

export default PollStatus;
