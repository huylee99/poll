import * as trpc from "@trpc/server";
import superjson from "superjson";
import { pollRouter } from "./polls";

export const appRouter = trpc.router().transformer(superjson).merge("poll.", pollRouter);

export type AppRouter = typeof appRouter;
