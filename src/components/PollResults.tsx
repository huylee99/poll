import { trpc } from "@utils/trpc";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import Range from "@components/Range";
import Link from "next/link";
import SharePoll from "@components/SharePoll";
import { SkeletonPollPage } from "@components/Skeleton";

type PollResultsProps = {
  id: string;
};

const PollResults = ({ id }: PollResultsProps) => {
  const { data, isLoading } = trpc.useQuery(["poll.get-votes", { id }]);

  if (isLoading) {
    return <SkeletonPollPage />;
  }

  if (!data && !isLoading) {
    return <div>Poll not found</div>;
  }

  const getTotal = () => {
    return data.votes.reduce((prev, curr) => {
      return prev + curr._count;
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
        <div className="flex flex-col -my-2 mb-8">
          {!!data.poll &&
            (data.poll.options as { content: string }[]).map((option, index) => (
              <div key={option.content} className="my-2">
                <h4 className="text-slate-300 mb-2">
                  {option.content} {`(${data.votes.find(vote => vote.choice === index)?._count || 0})`}
                </h4>
                <Range percentage={getPercentage(data.votes.find(vote => vote.choice === index)?._count || 0)} />
              </div>
            ))}
        </div>

        <div className="flex items-center -mx-2">
          <div className="flex-1 mx-2">
            <Link href={`/poll/${id}`} passHref>
              <a className="w-full text-sm flex rounded-md items-center justify-center bg-slate-700 py-3 text-slate-200 hover:bg-slate-600 transition-all">
                <ChevronLeftIcon className="w-5 h-5 text-slate-300 mr-2" /> Back to poll
              </a>
            </Link>
          </div>
          <div className="flex-1 mx-2">
            <SharePoll pollId={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PollResults;
