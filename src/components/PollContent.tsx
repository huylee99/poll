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
          {(data?.options as { content: string }[]).map((option, index) => {
            return (
              <label key={index} htmlFor={`choice.${index}`}>
                <input {...register("choice")} id={`choice.${index}`} type="radio" value={`${index}`} />
                {option.content}
              </label>
            );
          })}

          <button type="submit">Submit</button>
        </form>
      </div>
      {/* {data.isOwner ? <div className="text-red-500">You owned this</div> : null} */}
    </>
  );
};

export default PollContent;
