import { trpc } from "@utils/trpc";
import Range from "@components/Range";

type PollResultsProps = {
  id: string;
};

const PollResults = ({ id }: PollResultsProps) => {
  const { data, isLoading } = trpc.useQuery(["poll.get-votes", { id }]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (!data && !isLoading) {
    return <div>Poll not found</div>;
  }

  const getTotal = () => {
    return data.votes.reduce((prev, curr) => {
      return prev + curr._count.choice;
    }, 0);
  };

  const getPercentage = (vote: number) => {
    return Math.round((vote / getTotal()) * 100);
  };

  return (
    <>
      {isLoading && <div>...Loading</div>}

      <div className="w-full bg-slate-800 border-t-4 border-pink-600 rounded-md p-8">
        <div className="mb-8">
          <h2 className="text-slate-200 text-2xl font-medium mb-2">{data.poll?.question}</h2>
          <span className="text-slate-400">2 minutes ago</span>
        </div>
        <div className="flex flex-col -my-2">
          {!!data.poll &&
            (data.poll.options as { content: string }[]).map((option, index) => (
              <div key={option.content} className="my-2">
                <h4 className="text-slate-300 mb-2">
                  {option.content} {`(${data.votes[index]?._count.choice})`}
                </h4>
                <Range percentage={getPercentage(data.votes[index]?._count.choice || 0)} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PollResults;
