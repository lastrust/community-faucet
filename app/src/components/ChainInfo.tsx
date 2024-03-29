import { SupportedContracts } from "@/config";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";

const StatsBase = dynamic(() => import("@/components/StatsBase"), {
  ssr: false,
});

const ChainInfo: React.FC<{
  children: string;
  theme: string;
  type: SupportedContracts;
  symbol: string;
  href: string;
  w?: 1 | 2;
}> = ({ children, theme, type, symbol, href, w = 1 }) => {
  return (
    <div
      className={`card-body bg-base-200 text-base-content ${
        w === 1 ? "col-span-1" : "sm:col-span-2"
      }`}
      data-theme={theme}
    >
      <NextLink
        href={href}
        className="link link-hover flex items-center justify-center text-2xl font-bold"
      >
        <BsLink45Deg />
        <h2>{children}</h2>
      </NextLink>
      <div className="hidden w-full sm:block">
        <StatsBase vertical type={type} symbol={symbol} />
      </div>
    </div>
  );
};

export default ChainInfo;
