import { trpc } from "@utils/trpc";

const PollContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(["poll.get-by-id", { id }]);

  if (!data && !isLoading) {
    return <div>Question not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{data?.question}</div>;
};

export default PollContent;
