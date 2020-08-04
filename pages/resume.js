import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/container';
import Header from 'components/header';
import Layout from 'components/layout';
import ProjectList from 'components/project-list';
import { getResumeProjects, getPortraitURL } from '../lib/api';
import Head from 'next/head';
import Aclamations from 'components/aclamations';
import AppFooter from 'components/footer';

export default function Resume({ preview, resumeProjects, portraitURL }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title key="title">Resume | Cole Turner</title>
        </Head>

        <Header portraitURL={portraitURL} />
        <Container>
          <ProjectList projects={resumeProjects} />
        </Container>
        <Container>
          <Aclamations />
        </Container>
        <AppFooter portraitURL={portraitURL} />
      </Layout>
    </>
  );
}

Resume.propTypes = { preview: PropTypes.bool, resumeProjects: PropTypes.array };

export async function getStaticProps({ preview = false }) {
  const resumeProjects = await getResumeProjects(preview);
  const portraitURL = await getPortraitURL();

  return {
    props: { preview, resumeProjects, portraitURL },
    revalidate: 60,
  };
}
