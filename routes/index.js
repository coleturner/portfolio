const express = require('express');
const { Router: expressRouter } = express;
const router = expressRouter();

const contentful = require('../util/contentful');

router.get('/', async (req, res, next) => {
  try {
    const metaData = await contentful.getAppMeta('home');
    const entries = await contentful.getEntries({
      content_type: 'page',
      'fields.url': '/',
      include: 10
    });

    const page = entries.items[0];
    const fields = page.fields;
    const contents = await contentful.normalize(fields.contents);

    res.render('index', {
      metaData,
      contents,
      bodyClass: 'index',
      title: fields.title,
      description: fields.seoDescription
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
