import type { NextPage } from "next";

import Head from "next/head";
import Link from "next/link";
import PollCard from "@components/PollCard";
import PageTitle from "@components/PageTitle";
import { trpc } from "../utils/trpc";

import { SkeletonPollCard } from "@components/Skeleton";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["poll.get-all"]);

  return (
    <div>
      <Head>
        <title>Poll</title>
        <meta name="description" content="A small app to create poll" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageTitle title="Poll" />
        <div className="container">
          <div className="mb-4">
            <span className="text-slate-400">Interesting? </span>
            <Link href="/create">
              <a className="text-pink-500 font-medium hover:underline hover:underline-offset-2">Create poll here!</a>
            </Link>
          </div>

          <div className="flex flex-col -my-3">
            {!isLoading ? (
              data?.polls.map(poll => <PollCard key={poll.id} poll={poll} />)
            ) : (
              <>
                <SkeletonPollCard />
                <SkeletonPollCard />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
