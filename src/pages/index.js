import * as React from "react"
import { Link, graphql } from "gatsby"
import { Button, Grid, Paper } from '@material-ui/core';

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />

      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          var image = getImage(data.defalt_image)
          if (post.frontmatter.thumbnail != null) {
            image = getImage(post.frontmatter.thumbnail)
          }

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <GatsbyImage image={image} alt="" />
                  </Grid>
                  <Grid item xs={8}>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                    {/* <Tag tags={tags} /> */}
                  </Grid>
                </Grid>
              </article>

            </li>
          )
        })}
      </ol>
    </Layout >
  )
}

export default BlogIndex

export const pageQuery = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
  defalt_image: file(absolutePath: { regex: "/defalt.png/" }) {
    childImageSharp {
      gatsbyImageData(width: 200)
    }
  }
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    nodes {
      excerpt
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY/MM/DD")
        title
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 200)
          }
        }
      }
    }
  }
}
`
