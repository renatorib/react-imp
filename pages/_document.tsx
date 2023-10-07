import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
              body {
                font-family: Inter, "sans-serif";
                padding: 0;
                margin: 0;
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
