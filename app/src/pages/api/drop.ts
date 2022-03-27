import { NextApiRequest, NextApiResponse } from "next";

type queryMeta = {
  id?: number;
};

const tokenUri = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as queryMeta;
  await new Promise<void>((resolve) => resolve());
};

export default tokenUri;
