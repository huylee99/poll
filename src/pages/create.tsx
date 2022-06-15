import type { createPollType } from "src/shared/createPollValidator";

import { useRef } from "react";
import { trpc } from "@utils/trpc";
import { useForm, useFieldArray } from "react-hook-form";
import { NextPage } from "next";
import PageTitle from "@components/PageTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import createPollValidator from "src/shared/createPollValidator";

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
  const client = trpc.useContext();

  const onSubmit = (data: createPollType) => console.log(data);

  //   const { mutate, isLoading } = trpc.useMutation("poll.create", {
  //     onSuccess: () => {
  //       client.invalidateQueries(["poll.get-all"]);

  //       if (inputRef.current) {
  //         inputRef.current.value = "";
  //       }
  //     },
  //   });

  return (
    <div className="container">
      <main>
        <PageTitle title="Create Poll" />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("question")} placeholder="Question?" />
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <section className={"section"} key={field.id}>
                    <input
                      placeholder="Option"
                      {...register(`options.${index}.content`, {
                        required: true,
                      })}
                      className={errors?.options && errors?.options[index]?.content ? "text-red-600" : ""}
                    />

                    <button type="button" onClick={() => remove(index)}>
                      DELETE
                    </button>
                  </section>
                </div>
              );
            })}

            <button type="button" onClick={() => append({ content: "" })}>
              append
            </button>
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default QuestionCreator;
