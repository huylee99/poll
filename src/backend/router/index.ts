import superjson from "superjson";
import { pollRouter } from "./polls";
import { createRouter } from "@backend/context";
import { voteRouter } from "./votes";

export const appRouter = createRouter().transformer(superjson).merge("poll.", pollRouter).merge("vote.", voteRouter);

export type AppRouter = typeof appRouter;
