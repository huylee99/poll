import { MouseEventHandler, useState } from "react";
import copy from "copy-to-clipboard";
import { ShareIcon, ClipboardCopyIcon } from "@heroicons/react/solid";
import PollDialog from "./Dialog";

type SharePollProps = {
  pollId: string;
};

const SharePoll = ({ pollId }: SharePollProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = (typeof window !== "undefined" && `${window.location.origin}/poll/${pollId}`) || "";

  const handleCopy: MouseEventHandler<HTMLButtonElement> = () => {
    copy(shareUrl);
    setCopied(true);
  };

  return (
    <>
      <button
        type="button"
        className="w-full text-sm rounded-md flex items-center justify-center bg-slate-700 py-3 text-slate-200 hover:bg-slate-600 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <ShareIcon className="w-5 h-5 text-slate-300 mr-2" /> Share
      </button>

      <PollDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <h3 className="text-lg text-slate-200 mb-2">Invite via link</h3>
          <p className="text-slate-500 mb-4 text-sm">Use this link to invite participants directly.</p>
          <div className="flex items-stretch rounded-md overflow-hidden">
            <div className="flex-grow">
              <label className="sr-only" htmlFor="invite-link">
                Invite link
              </label>
              <input
                defaultValue={shareUrl}
                id="invite-link"
                type="text"
                readOnly
                disabled
                className="bg-slate-700 outline-none border-none w-full text-sm text-slate-400"
              />
            </div>
            <button
              onClick={handleCopy}
              type="button"
              className="ml-auto inline-flex text-sm font-medium text-slate-300 items-center bg-slate-600 px-6 hover:bg-slate-500 transition-all"
            >
              <ClipboardCopyIcon className="w-5 h-5 text-slate-300 mr-1" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="h-[0.5px] my-4 bg-slate-600"></div>
          <button
            type="button"
            className="w-full text-center bg-slate-600 text-sm text-slate-300 font-medium py-2 rounded-md hover:bg-slate-700 transition-all"
            onClick={() => {
              setIsOpen(false);
              setCopied(false);
            }}
          >
            Close
          </button>
        </div>
      </PollDialog>
    </>
  );
};

export default SharePoll;
