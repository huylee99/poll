import type { createPollType } from "src/shared/createPollValidator";

import { XIcon } from "@heroicons/react/outline";
import { useForm, useFieldArray } from "react-hook-form";
import { NextPage } from "next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

import PageTitle from "@components/PageTitle";
import createPollValidator from "src/shared/createPollValidator";
import { trpc } from "@utils/trpc";

import Head from "next/head";

const QuestionCreator: NextPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<createPollType>({
    resolver: zodResolver(createPollValidator),
    defaultValues: {
      question: "",
      options: [],
    },
  });
  const { fields, append, remove } = useFieldArray<createPollType>({
    name: "options",
    control,
  });
  const router = useRouter();

  const onSubmit = (data: createPollType) => {
    const { options, question } = data;
    mutate({ question, options });
  };

  const { mutate, isLoading } = trpc.useMutation("poll.create", {
    onSuccess: data => {
      if ("message" in data) {
        return;
      }

      router.push(`/poll/${data.id}`);
    },
  });

  return (
    <div>
      <Head>
        <title>Create Poll</title>
        <meta name="description" content="Create poll" />
      </Head>
      <div className="container">
        <main>
          <PageTitle title="Create Poll" />
          <div className="w-full bg-slate-800 border-t-4 border-pink-600 rounded-md p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full antialiased">
              <div className="mb-4">
                <label htmlFor="question" className="inline-block text-slate-300 font-medium mb-2">
                  Poll Question
                </label>
                <input
                  type="text"
                  {...register("question")}
                  placeholder="What is my name?"
                  className="w-full p-3 bg-slate-700 text-slate-400 rounded-md focus:ring-1 focus:ring-pink-500 focus:outline-none"
                />
              </div>

              <label className="inline-block text-slate-300 font-medium mb-2">Options</label>
              <div className="flex flex-col -my-1 mb-4">
                {fields.map((field, index) => {
                  return (
                    <div key={field.id} className="flex items-center relative my-1">
                      <input
                        placeholder={`Option ${index + 1}`}
                        {...register(`options.${index}.content`, {
                          required: true,
                        })}
                        className="w-full py-3 px-4 pr-10 bg-slate-700 text-slate-400 rounded-md focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      />

                      <XIcon
                        onClick={() => remove(index)}
                        className="ml-auto absolute right-2 w-6 h-6 text-slate-400"
                        role="button"
                      />
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => append({ content: "" })}
                className="py-2 px-4 bg-slate-700 font-medium text-slate-300 rounded-md hover:bg-slate-600"
              >
                Add option
              </button>

              <div className="my-4 h-[0.5px] bg-slate-600"></div>

              <div className="text-right">
                <button
                  type="submit"
                  className="py-2 px-4 bg-pink-700 font-medium text-slate-200 rounded-md hover:bg-pink-600 disabled:opacity-80 disabled:pointer-events-none"
                  disabled={isLoading}
                >
                  Create poll
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuestionCreator;
