// pages/sitemap.xml.js
import { BASE_URL } from '../lib/constants';
import { getAllPostsForSitemap, getAllTagsForSitemap } from '../lib/api';

const createSitemap = ({
  posts,
  tags,
}) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        <url>
            <loc>${`${BASE_URL}`}</loc>
            <changefreq>daily</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>${`${BASE_URL}blog`}</loc>
            <changefreq>daily</changefreq>
            <priority>0.5</priority>
        </url>
        ${tags
          .map(({ slug }) => {
            return `
                    <url>
                        <loc>${`${BASE_URL}blog/${slug}`}</loc>
                        <changefreq>daily</changefreq>
                        <priority>0.7</priority>
                    </url>
                `;
          })
          .join('')}
        ${posts
          .map(({ slug }) => {
            return `
                    <url>
                        <loc>${`${BASE_URL}posts/${slug}`}</loc>
                        <changefreq>daily</changefreq>
                        <priority>0.7</priority>
                    </url>
                `;
          })
          .join('')}
    </urlset>
    `;

export async function getServerSideProps({ res }) {
  const posts = await getAllPostsForSitemap();
  const tags = await getAllTagsForSitemap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(createSitemap({ posts, tags }));
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
