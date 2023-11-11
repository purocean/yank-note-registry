const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const index = require('./index.json');
const { official, registry } = require('./extensions.json');

const cdnPrefix = 'https://fastly.jsdelivr.net/npm/'

function createDirectoryIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    const parent = path.dirname(dirPath);

    if (!fs.existsSync(parent)) {
      createDirectoryIfNotExists(parent);
    }

    fs.mkdirSync(dirPath);
  }
}

async function buildCDNUrl (id, version, filename) {
  if (!filename) {
    return filename;
  }

  let url = filename

  if (!/^https?:\/\//.test(url)) {
    url = `${cdnPrefix}${id}@${version}/${filename}`
  } else {
    filename = path.basename(filename.replace(/^https?:\/\/[^/]+\//, ''))
  }

  let urlPath = path.join('cdn', id, version, filename)
  let filePath = path.join(__dirname, urlPath);

  createDirectoryIfNotExists(path.dirname(filePath));

  await new Promise(async (resolve, reject) => {
    console.log(`    Download: ${url}`);
    const res =  await fetch(url)

    // file path without extension
    if (!path.extname(filePath)) {
      const contentType = res.headers.get('content-type');
      const ext = contentType.split('/')[1];
      urlPath += `.${ext}`;
      filePath += `.${ext}`;
    }

    const stream = res.body;
    stream.on('end', resolve);
    stream.on('error', reject);
    stream.pipe(fs.createWriteStream(filePath));
  });

  const _url = new URL('https://registry.yank-note.com/' + urlPath);
  const cdnUrl = _url.toString();
  console.log(`    CDN: ${cdnUrl}`);
  return cdnUrl;
}

async function buildMarkdownCDNUrl (id, version, filename) {
  if (!filename) {
    return filename;
  }

  let url = filename

  if (!/^https?:\/\//.test(url)) {
    url = `${cdnPrefix}${id}@${version}/${filename}`
  } else {
    filename = path.basename(filename.replace(/^https?:\/\/[^/]+\//, ''))
  }

  const urlPath = path.join('cdn', id, version, filename)
  const filePath = path.join(__dirname, urlPath);

  createDirectoryIfNotExists(path.dirname(filePath));

  console.log(`    Download: ${url}`);
  let markdown = await fetch(url).then(res => res.text());
  if (markdown.length) {
    const imgReg = /!\[(.*?)\]\((.*?)\)/g
    const match = markdown.match(imgReg)
    if (match) {
      for (const m of match) {
        const imgUrl = m.match(/!\[(.*?)\]\((.*?)\)/)[2]
        const cdnUrl = await buildCDNUrl(id, version, imgUrl)
        markdown = markdown.replace(new RegExp(imgUrl, 'g'), cdnUrl)
      }
    }

    fs.writeFileSync(filePath, markdown);
    process.exit();
  }

  const _url = new URL('https://registry.yank-note.com/' + urlPath);
  const cdnUrl = _url.toString();
  console.log(`    CDN: ${cdnUrl}`);
  return cdnUrl;
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
  packageJson.readmeUrl = await buildMarkdownCDNUrl(id, version, packageJson.readmeUrl || 'README.md')
  packageJson.changelogUrl = await buildCDNUrl(id, version, packageJson.changelogUrl || 'CHANGELOG.md')

  return packageJson;
}

async function triggerSyncPackage (id) {
  const url = `https://registry-direct.npmmirror.com/${id}/sync?sync_upstream=true`
  console.log(`    Sync: ${url}`);
  await fetch(url, { method: 'PUT' });
}

async function transform (list, official = false) {
  const data = [];

  for (const item of list) {
    const old = index.find(i => i.name === item.id);
    const origin = official ? 'official' : 'registry';
    console.log(`Transform ${origin} ${item.id}@${item.version}`);
    if (!old || old.version !== item.version) {
      data.push({ ...await fetchInfo(item.id, item.version), origin });
      await triggerSyncPackage(item.id);
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
