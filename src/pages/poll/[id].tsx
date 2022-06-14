import { useRouter } from "next/router";
import PollContent from "@components/PollContent";
import { useEffect } from "react";

const Poll = () => {
  const { query, push, isReady } = useRouter();
  const { id } = query;

  useEffect(() => {
    if (isReady && !id) {
      push("/");
    }
  }, [id, isReady, push]);

  return <div>{id ? <PollContent id={id as string} /> : null}</div>;
};

export default Poll;
