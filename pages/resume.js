import { debounce } from 'lodash';
import Container from '../components/container';
import MoreStories from '../components/stories-list';
import Header from '../components/header';
import Layout from '../components/layout';
import ProjectList from '../components/project-list';
import { getLatestPostsForHome, getResumeProjects } from '../lib/api';
import Head from 'next/head';
import { em, percent } from '../styles/units';
import styled from '@emotion/styled';
import { useRef, useCallback } from 'react';
import Aclamations from '../components/aclamations';
import AppFooter from '../components/footer';

export default function Index({ preview, resumeProjects }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Resume | Cole Turner</title>
        </Head>

        <Header />
        <Container>
          <ProjectList projects={resumeProjects} />
        </Container>
        <Container>
          <Aclamations />
        </Container>
        <AppFooter />
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const resumeProjects = await getResumeProjects(preview);

  return {
    props: { preview, resumeProjects },
  };
}
