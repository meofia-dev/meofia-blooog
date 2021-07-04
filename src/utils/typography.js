// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Typography from 'typography'
import githubTheme from 'typography-theme-github'
import funstonTheme from 'typography-theme-funston'
const typography = new Typography(githubTheme);
// const typography = new Typography(funstonTheme);

export default typography
