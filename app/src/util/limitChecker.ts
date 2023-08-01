import { LRUCache } from "lru-cache";
import type { NextApiResponse } from "next";

type CheckLimitFunc = (options?: Options) => {
  check: (
    res: NextApiResponse,
    limit: number,
    ipAddress: string
  ) => Promise<void>;
};

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export const rateLimit: CheckLimitFunc = (options?: Options) => {
  const tokenCache = new LRUCache<string, number>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (res, limit, token): Promise<void> =>
      new Promise((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || 0;

        const currentUsage = tokenCount + 1;
        tokenCache.set(token, currentUsage);

        const isRateLimited = currentUsage > limit;
        res.setHeader("X-RateLimit-Limit", limit);
        res.setHeader(
          "X-RateLimit-Remaining",
          isRateLimited ? 0 : limit - currentUsage
        );

        return isRateLimited ? reject("Too Many Requests") : resolve();
      }),
  };
};
