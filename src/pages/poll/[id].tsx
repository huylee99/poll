import { useRouter } from "next/router";
import PollContent from "@components/PollContent";

const Poll = () => {
  const { query } = useRouter();
  const { id } = query;

  return <div>{id ? <PollContent id={id as string} /> : null}</div>;
};

export default Poll;
