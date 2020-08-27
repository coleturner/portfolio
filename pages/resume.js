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
import styled from '@emotion/styled';
import { gradientTextStyle } from '../styles/global';

const Title = styled.h1`
  ${gradientTextStyle};
`;

const Hero = styled.div`
  background: rgba(0, 0, 0, 0.15);
  border-bottom: 3px solid rgba(255, 255, 255, 0.06);
  padding: 2em 0;
  font-size: 1.25em;

  h1 {
    margin: 0;
    font-size: 1.25em;
  }
`;

export default function Resume({ preview, resumeProjects, portraitURL }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title key="title">Resume | Cole Turner</title>
        </Head>

        <Header portraitURL={portraitURL} />
        <Hero>
          <Container>
            <Title>Resume</Title>
            <p>
              I am a full-stack engineer and startup co-founder. Here are some
              of my favorite projects that I&apos;ve worked on since 2004.
            </p>
          </Container>
        </Hero>
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
