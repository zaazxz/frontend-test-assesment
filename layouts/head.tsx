import React from "react";
import NextHead from "next/head";

import { siteConfig } from "@/config/site";

export const Head = (name?: any) => {

  // default config
  const config = siteConfig();

  console.log(name);

  return (
    <NextHead>

      {/* Title */}
      <title>
        
        {/* Check if passing a title string send to siteConfig */}
        {name ? `${name.title} | ${config.name}` : config.name}

      </title>

      <meta key="title" content={config.name} property="og:title" />
      <meta content={config.description} property="og:description" />
      <meta content={config.description} name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />

      {/* Favicon */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/logo/sovware-logo.png"
      />

    </NextHead>
  );
};
