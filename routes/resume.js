const express = require('express');
const router = express.Router();
const contentful = require('../util/contentful');


router.get('/resume', (req, res, next) => {

  contentful.getEntries({
    content_type: 'page',
    'fields.url': '/resume',
    include: 10
  })
  .then(async function resolve(entries) {
    const page = entries.items[0];
    const fields = page.fields;
    const contents = await contentful.normalize(fields.contents);

    res.render('resume', {
      contents,
      bodyClass: 'resume',
      title: fields.title,
      description: fields.seoDescription
    });
  }).catch(next);

});

module.exports = router;
