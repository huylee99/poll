import { trpc } from "@utils/trpc";

const PollContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(["poll.get-by-id", { id }]);

  if (!data && !isLoading) {
    return <div>Question not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>{data?.question}</div>
      {data.isOwner ? <div className="text-red-500">You owned this</div> : null}
    </>
  );
};

export default PollContent;
