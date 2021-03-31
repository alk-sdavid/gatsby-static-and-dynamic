import { graphql } from "gatsby"
import React from "react"
import { LeafletMap } from "../components/map"
import SEO from "../components/seo"
import "./index.css"

export default function Home({ data }) {
  const getRegionalIndicatorSymbol = letter =>
    String.fromCodePoint(0x1f1e6 - 65 + letter.toUpperCase().charCodeAt(0))
  const getCountryFlag = country =>
    getRegionalIndicatorSymbol(country[0]) +
    getRegionalIndicatorSymbol(country[1])
  return (
    <main>
      <SEO title="Home" description="This this the home page" />
      <section className="section static">
        <h1>Static content</h1>
        <p>{data.site.siteMetadata.title}</p>
        <p>{data.site.siteMetadata.flags.map(getCountryFlag).join(" ")}</p>
      </section>
      <section className="section dynamic">
        <h1>Dynamic content</h1>
        <LeafletMap />
      </section>
    </main>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        flags
      }
    }
  }
`
