type RangeProps = {
  percentage: number;
};

const Range = ({ percentage }: RangeProps) => {
  return (
    <div className="w-full h-5 bg-slate-600 rounded-md relative overflow-hidden">
      <div
        className="absolute left-0 bg-pink-700 h-full transition-all duration-200"
        style={{ width: `${percentage}%` }}
      >
        <div className="inline-block absolute text-sm text-slate-300 right-2">{percentage}%</div>
      </div>
    </div>
  );
};

export default Range;
