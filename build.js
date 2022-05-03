const fs = require('fs');
const fetch = require('node-fetch');
const index = require('./index.json');
const { official, unofficial } = require('./extensions.json');

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

  if (packageJson.icon && !/^https?:\/\//.test(packageJson.icon)) {
    packageJson.icon = `https://unpkg.com/${id}@${version}/${packageJson.icon}`;
  }

  return packageJson;
}

async function transform (list, official = false) {
  const data = [];

  for (const item of list) {
    const old = index.find(i => i.name === item.id);
    const origin = official ? 'official' : 'unofficial';
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
    ...await transform(unofficial, false)
  ];

  fs.writeFileSync('./index.json', JSON.stringify(data, null, 2));
}

build();
