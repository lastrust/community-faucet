import * as trpc from "@trpc/server";
import { z } from "zod";

export const dropRouter = trpc.router().mutation("drop", {
  input: z.object({
    message: z.object({
      chainId: z.string(),
      address: z.string(),
      signedAt: z.string(),
    }),
    signature: z.string(),
  }),
  resolve: () => {},
});
