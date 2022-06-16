import { useRouter } from "next/router";
import Head from "next/head";
import PollContent from "@components/PollContent";
import PageTitle from "@components/PageTitle";

const Poll = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <div>
      <Head>
        <title>Poll</title>
        <meta name="description" content="Poll" />
      </Head>
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
