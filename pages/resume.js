import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/container';
import Header from 'components/header';
import Layout from 'components/layout';
import ProjectList from 'components/project-list';
import { getResumeProjects } from '../lib/api';
import Head from 'next/head';
import Aclamations from 'components/aclamations';
import AppFooter from 'components/footer';

export default function Resume({ preview, resumeProjects }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title key="title">Resume | Cole Turner</title>
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

Resume.propTypes = { preview: PropTypes.bool, resumeProjects: PropTypes.array };

export async function getStaticProps({ preview = false }) {
  const resumeProjects = await getResumeProjects(preview);

  return {
    props: { preview, resumeProjects },
    revalidate: 60,
  };
}
