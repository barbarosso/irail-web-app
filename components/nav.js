import React from "react";
import Link from "next/link";

const links = [
  { href: "https://docs.irail.be/", label: "Api documentatie" },
  { href: "https://hello.irail.be/", label: "Blog" }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Plan nieuwe route</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/search-station" as="search-station">
          <a>Zoek nieuwe stations</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/peak-guide" as="peak-guide">
          <a>Spitsgids</a>
        </Link>
      </li>

      {links.map(({ key, href, label }) => (
        <li key={key}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
);

export default Nav;
