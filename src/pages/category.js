import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article/";
import Headline from "../components/Article/Headline";
import List from "../components/List";
import Seo from "../components/Seo";
import { parseCategories } from "../utils/parseCategories";
import { kebabCase } from "lodash";
import { Link } from "gatsby";

const CategoryPage = props => {
  const {
    data: {
      posts: { edges: posts },
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  // Create category list
  const detectedCategoriesInPosts = {};
  posts.forEach(edge => {
    const {
      node: {
        frontmatter: { categories }
      }
    } = edge;

    parseCategories(categories).forEach(category => {
      if (!detectedCategoriesInPosts[category]) {
        detectedCategoriesInPosts[category] = [];
      }
      detectedCategoriesInPosts[category].push(edge);
    });
  });

  const categoryList = [];

  for (var key in detectedCategoriesInPosts) {
    categoryList.push([key, detectedCategoriesInPosts[key]]);
  }

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="🌄 Overzicht per categorie" theme={theme} />
            </header>
            {categoryList.map(item => (
              <section key={item[0]}>
                <Link to={`/category/${kebabCase(item[0])}`}>
                  <h2>
                    <FaTag /> {item[0]}
                  </h2>
                </Link>
                <List edges={item[1]} theme={theme} />
              </section>
            ))}
            {/* --- STYLES --- */}
            <style jsx>{`
              h2 {
                margin: 0 0 0.5em;
              }
              h2 :global(svg) {
                height: 0.8em;
                fill: ${theme.color.brand.primary};
              }
            `}</style>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

CategoryPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default CategoryPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query PostsQuery {
    posts: allMdx(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            categories
            author
            cover {
              children {
                ... on ImageSharp {
                  fluid(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
