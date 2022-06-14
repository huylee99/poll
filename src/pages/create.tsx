import { useRef } from "react";
import { trpc } from "@utils/trpc";
import { useForm } from "react-hook-form";

type FormValues = {
  question: string;
};

const QuestionCreator = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const client = trpc.useContext();

  //   const { mutate, isLoading } = trpc.useMutation("poll.create", {
  //     onSuccess: () => {
  //       client.invalidateQueries(["poll.get-all"]);

  //       if (inputRef.current) {
  //         inputRef.current.value = "";
  //       }
  //     },
  //   });

  return <></>;
};
