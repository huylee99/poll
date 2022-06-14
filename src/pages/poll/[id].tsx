import { useRouter } from "next/router";
import PollContent from "@components/PollContent";
import { useEffect } from "react";

const Poll = () => {
  const { query, push } = useRouter();
  const { id } = query;

  useEffect(() => {
    if (!id) {
      push("/");
    }
  }, [id, push]);

  return <PollContent id={id as string} />;
};

export default Poll;
