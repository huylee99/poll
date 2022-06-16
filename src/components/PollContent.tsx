import type { createVoteFieldType } from "@shared/createVoteValidator";
import { ChartBarIcon, ShareIcon } from "@heroicons/react/solid";
import { trpc } from "@utils/trpc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { createVoteFieldValue } from "@shared/createVoteValidator";

const PollContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(["poll.get-by-id", { id }]);

  const { mutate } = trpc.useMutation(["vote.create"]);

  const { register, handleSubmit } = useForm<createVoteFieldType>({ resolver: zodResolver(createVoteFieldValue) });

  const onSubmit = (data: createVoteFieldType) => {
    mutate({ choice: parseInt(data.choice), pollId: id });
  };

  if (!data && !isLoading) {
    return <div>Question not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full bg-slate-800 border-t-4 border-pink-600 rounded-md p-8">
        <div className="mb-8">
          <h2 className="text-slate-200 text-2xl font-medium mb-2">{data.question}</h2>
          <span className="text-slate-400">2 minutes ago</span>
        </div>

        <h4 className="text-slate-400 mb-6">Make a choice</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col -my-2 mb-6">
            {(data?.options as { content: string }[]).map((option, index) => {
              return (
                <label key={index} htmlFor={`choice.${index}`} className="cursor-pointer flex my-2 text-slate-200">
                  <input
                    {...register("choice")}
                    id={`choice.${index}`}
                    type="radio"
                    value={`${index}`}
                    className="w-5 h-5 inline-block text-pink-600 bg-slate-500 focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer mr-3 mt-[0.5px]"
                    disabled={data.isVoted}
                    defaultChecked={data.myVote?.choice === index}
                  />
                  {option.content}
                </label>
              );
            })}
          </div>

          <div className="flex items-center -mx-2">
            <div className="flex-1 mx-2">
              <button
                type="submit"
                className="text-center w-full font-medium bg-pink-800 text-slate-200 py-3 rounded-md text-sm hover:bg-pink-700 transition-all disabled:bg-opacity-80 disabled:pointer-events-none"
                disabled={data.isVoted}
              >
                {data.isVoted ? "You already voted on this poll." : "Vote"}
              </button>
            </div>
            <div className="flex-1 flex items-center">
              <div className="flex-1 mx-2">
                <Link href={`/poll/${id}/results`} passHref>
                  <a className="w-full text-sm flex rounded-md items-center justify-center bg-slate-700 py-3 text-slate-200 hover:bg-slate-600 transition-all">
                    <ChartBarIcon className="w-5 h-5 text-slate-300 mr-2" /> Results
                  </a>
                </Link>
              </div>
              <div className="flex-1 mx-2">
                <button
                  type="button"
                  className="w-full text-sm rounded-md flex items-center justify-center bg-slate-700 py-3 text-slate-200 hover:bg-slate-600 transition-all"
                >
                  <ShareIcon className="w-5 h-5 text-slate-300 mr-2" /> Share
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PollContent;
