require('dotenv').config();

it('has valid credentials', () => {
  expect(process.env.CONTENTFUL_SPACE_ID).toBeDefined();
  expect(process.env.CONTENTFUL_ACCESS_TOKEN).toBeDefined();

  const contentful = require('contentful');
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });

  client.getSpace().then(space => {
    expect(space.sys).toBe({
      type: 'Space',
      id: process.env.CONTENTFUL_SPACE_ID
    });
  });
});
