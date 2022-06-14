import superjson from "superjson";
import { pollRouter } from "./polls";
import { createRouter } from "@backend/context";

export const appRouter = createRouter().transformer(superjson).merge("poll.", pollRouter);

export type AppRouter = typeof appRouter;
