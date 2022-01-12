import Link from "next/link";
import React from "react";

export default function Customenot404() {
  return (
    <div>
      Page you are looking for is &ldquo; Not Found &rdquo; <br /> as we are
      still under construction you may not found the appropriate page, sorry for
      the inconvinece <br />
      <Link href="/">
        <a style={{ color: "blue" }}>go to home</a>
      </Link>
    </div>
  );
}
