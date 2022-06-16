import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import PageTitle from "@components/PageTitle";
import PollResults from "@components/PollResults";

const Results: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <div>
      <Head>
        <title>Results</title>
        <meta name="description" content="Poll's result" />
      </Head>
      <main>
        <div className="container">
          <PageTitle title="Results" />
          {id ? <PollResults id={id as string} /> : null}
        </div>
      </main>
    </div>
  );
};

export default Results;
