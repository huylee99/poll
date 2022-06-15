import { useRouter } from "next/router";
import PollContent from "@components/PollContent";
import PageTitle from "@components/PageTitle";

const Poll = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <div>
      <main>
        <div className="container">
          <PageTitle title="Poll" />
          {id ? <PollContent id={id as string} /> : null}
        </div>
      </main>
    </div>
  );
};

export default Poll;
