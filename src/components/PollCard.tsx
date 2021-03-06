import PollStatus from "./PollStatus";
import Link from "next/link";
import { Poll } from "@prisma/client";

const PollCard: React.FC<{ poll: Poll }> = ({ poll }) => {
  const { id, question, endsAt } = poll;

  const isExpired = !!endsAt && new Date(endsAt) <= new Date(Date.now());
  const navigateUrl = isExpired ? `/poll/${id}/results` : `/poll/${id}`;
  const btnText = isExpired ? "Results" : "Vote";

  return (
    <div className="w-full bg-slate-800 p-3 sm:p-5 rounded-md my-3">
      <div className="flex items-center mb-4">
        <PollStatus isExpired={isExpired} />
        <Link href={navigateUrl} passHref>
          <a className="ml-auto py-2 px-5 bg-pink-700 font-medium text-white rounded-md hover:bg-pink-700 text-sm transition-all">
            {btnText}
          </a>
        </Link>
      </div>
      <div>
        <h2 className="text-slate-300 text-lg font-medium">{question}</h2>
      </div>
    </div>
  );
};

export default PollCard;
