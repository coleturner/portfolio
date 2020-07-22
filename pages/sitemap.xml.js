// pages/sitemap.xml.js
import { BASE_URL } from '../lib/constants';
import { getAllPostsForSitemap } from '../lib/api';

const createSitemap = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${`${BASE_URL}`}</loc>
        </url>
        <url>
            <loc>${`${BASE_URL}resume`}</loc>
        </url>
        <url>
            <loc>${`${BASE_URL}blog`}</loc>
        </url>
        ${posts
          .map(({ slug }) => {
            return `
                    <url>
                        <loc>${`${BASE_URL}posts/${slug}`}</loc>
                    </url>
                `;
          })
          .join('')}
    </urlset>
    `;

export async function getServerSideProps({ res }) {
  const posts = await getAllPostsForSitemap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(createSitemap(posts));
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
