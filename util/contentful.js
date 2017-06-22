const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});


const resolveLink = async (object) => {
  if (object.sys.linkType === 'Entry') {
    return await client.getEntry(object.sys.id);
  } else if (object.sys.linkType === 'Asset') {
    return await client.getAsset(object.sys.id);
  }

  return null;
};

client.normalize = async (props) => {
  if (typeof props !== 'object' || props === null) {
    return props;
  } else if (Array.isArray(props)) {
    return await Promise.all(props.map(async (prop) => await client.normalize(prop)));
  } else if (props && typeof props === 'object' && 'fields' in props) {
    const object = await client.normalize(props.fields);
    if (props.sys.type === 'Asset') {
      object.$type = props.sys.type;
    } else {
      object.$type = props.sys.contentType.sys.id;
    }

    return object;
  } else if (
    props &&
    typeof props === 'object' &&
    'sys' in props &&
    'type' in props.sys &&
    props.sys.type === 'Link'
  ) {
    const resolved = await resolveLink(props);
    return await client.normalize(resolved);
  }

  const result = await Object.keys(props).reduce(async (acc, value) => {
    const resolved = await acc;
    let object =  await client.normalize(props[value]);

    return Object.assign({}, resolved, {
      [value]: object
    });
  }, {});

  return result;
}

module.exports = client;
