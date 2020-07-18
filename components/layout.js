import PreviewAlert from '../components/previewAlert';
import Footer from '../components/footer';
import Meta from '../components/meta';
import styled from '@emotion/styled';

const Main = styled.main({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      {preview && <PreviewAlert />}
      <Main>{children}</Main>
    </>
  );
}
