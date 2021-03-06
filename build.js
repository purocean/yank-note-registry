const fs = require('fs');
const fetch = require('node-fetch');
const index = require('./index.json');
const { official, registry } = require('./extensions.json');

const cdnPrefix = 'https://fastly.jsdelivr.net/npm/'

async function buildCDNUrl (id, version, filename) {
  if (!filename) {
    return filename;
  }

  let url = filename

  if (!/^https?:\/\//.test(url)) {
    url = `${cdnPrefix}${id}@${version}/${filename}`
  }

  if (url.startsWith('https://fastly.jsdelivr.net/')) {
    console.log(`    Purge: ${url}`);
    await fetch(url.replace('cdn.jsdelivr.net', 'purge.jsdelivr.net'));
  }

  const _url = new URL(url);
  _url.searchParams.set('__t', Date.now());
  return _url.toString();
}

async function fetchInfo (id, version) {
  console.log(`    Fetching ${id}@${version}`);

  const { versions } = await fetch(`https://registry.npmjs.org/${id}`).then(r => r.json());

  const packageJson = versions[version]
  if (!packageJson) {
    throw new Error(`${id}@${version} not found`);
  }

  Object.keys(packageJson).forEach(key => {
    if (key.startsWith('_') || [
      'devDependencies',
      'dependencies',
      'peerDependencies',
      'optionalDependencies',
      'bundledDependencies',
      'scripts',
    ].includes(key)) {
      delete packageJson[key];
    };

    delete packageJson.dist.signatures;
    delete packageJson.dist['npm-signature'];
  });

  packageJson.icon = await buildCDNUrl(id, version, packageJson.icon)
  packageJson.readmeUrl = await buildCDNUrl(id, version, packageJson.readmeUrl || 'README.md')
  packageJson.changelogUrl = await buildCDNUrl(id, version, packageJson.changelogUrl || 'CHANGELOG.md')

  return packageJson;
}

async function transform (list, official = false) {
  const data = [];

  for (const item of list) {
    const old = index.find(i => i.name === item.id);
    const origin = official ? 'official' : 'registry';
    console.log(`Transform ${origin} ${item.id}@${item.version}`);
    if (!old || old.version !== item.version) {
      data.push({ ...await fetchInfo(item.id, item.version), origin });
    } else {
      data.push({ ...old, origin });
    }
  }

  return data;
}

async function build () {
  const data = [
    ...await transform(official, true),
    ...await transform(registry, false)
  ];

  fs.writeFileSync('./index.json', JSON.stringify(data, null, 2));
}

build();
