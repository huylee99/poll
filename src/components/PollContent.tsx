import type { createVoteFieldType } from "@shared/createVoteValidator";

import { trpc } from "@utils/trpc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
          <div className="flex flex-col -my-2">
            {(data?.options as { content: string }[]).map((option, index) => {
              return (
                <label key={index} htmlFor={`choice.${index}`} className="cursor-pointer flex my-2 text-slate-200">
                  <input
                    {...register("choice")}
                    id={`choice.${index}`}
                    type="radio"
                    value={`${index}`}
                    className="w-5 h-5 inline-block text-pink-600 bg-slate-500 focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer mr-3 mt-[0.5px]"
                  />
                  {option.content}
                </label>
              );
            })}
          </div>

          {data.isVoted ? (
            <div className="py-4 px-5 my-6 bg-red-900 bg-opacity-60 text-red-100 text-sm rounded-md">
              {"You already voted on this poll."}
            </div>
          ) : null}
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PollContent;
