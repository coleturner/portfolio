const express = require('express');
const router = express.Router();
const contentful = require('../util/contentful');


router.get('/resume', async (req, res, next) => {

  try {
    const metaData = await contentful.getAppMeta('resume');
    const entries = await contentful.getEntries({
      content_type: 'page',
      'fields.url': '/resume',
      include: 10
    });

    const page = entries.items[0];
    const fields = page.fields;
    const contents = await contentful.normalize(fields.contents);

    res.render('resume', {
      metaData,
      contents,
      bodyClass: 'resume',
      title: fields.title,
      description: fields.seoDescription
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
