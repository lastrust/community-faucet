import StatsBase from "@/components/StatsBase";
import { contractList } from "@/util/config";
import NextLink from "next/link";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";

const ChainInfo: React.FC<{
  children: string;
  theme: string;
  type: keyof typeof contractList;
  symbol: string;
  href: string;
}> = ({ children, theme, type, symbol, href }) => {
  return (
    <div
      className="card-body col-span-1 row-span-1 bg-base-200 text-base-content"
      data-theme={theme}
    >
      <NextLink href={href}>
        <a className="link link-hover flex items-center text-2xl font-bold">
          <BsLink45Deg />
          <h2>{children}</h2>
        </a>
      </NextLink>
      <div className="hidden w-full sm:block">
        <StatsBase vertical type={type} symbol={symbol} />
      </div>
    </div>
  );
};

export default ChainInfo;
