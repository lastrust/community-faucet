import { recoverDropRequest } from "../utils/index";
import { normalize } from "@metamask/eth-sig-util";
import * as trpc from "@trpc/server";
import { z } from "zod";

const VALID_TIME = 1000 * 60 * 5;

export const dropRouter = trpc.router().mutation("drop", {
  input: z.object({
    message: z.object({
      chainId: z.string(),
      address: z.string(),
      signedAt: z.string(),
    }),
    signature: z.string(),
  }),
  resolve: ({ input }) => {
    const recovered = recoverDropRequest(input.message, input.signature);
    if (normalize(input.signature) !== recovered)
      throw new trpc.TRPCError({
        code: "UNAUTHORIZED",
        message: "Signature do not match.",
      });
    if (new Date(input.message.signedAt).valueOf() + VALID_TIME < Date.now())
      throw new trpc.TRPCError({
        code: "UNAUTHORIZED",
        message: "Signature has expired.",
      });
  },
});
