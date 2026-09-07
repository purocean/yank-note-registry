# temp.md Temporary Preview for Yank Note

Publish the current Yank Note document to an unlisted, expiring
[temp.md](https://temp.md) preview URL.

Yank Note's built-in **Share Preview** is ideal on the same local network. This
extension adds an explicitly opt-in internet handoff for feedback, remote review,
and cross-device testing without configuring a permanent deployment.

## Features

- Exports the current Markdown document as self-contained HTML.
- Inlines local images using Yank Note's own export pipeline.
- Creates an unlisted temp.md URL that normally expires seven days after the
  last publish or update.
- Updates the same URL without exposing the update capability.
- Copies, opens, claims, or revokes the preview from the Yank Note status bar.
- Stores a separate preview record for each document.
- Refuses to publish encrypted documents.

## Install

Once accepted into the Yank Note Extension Registry, install **temp.md
Temporary Preview** from **Tools → Extension Center**.

For development or manual installation:

```bash
npm install
npm run build
```

Place this package in the Yank Note extension directory and enable it from the
Extension Center. Yank Note's extension development guide also supports:

```bash
npm run link-extension
npm run dev
```

## Usage

1. Open a Markdown document.
2. Select **temp.md → Publish temporary preview** in the status bar.
3. Review and accept the upload disclosure.
4. Share the copied URL.

Use **Update existing preview** to replace the content at the same URL. Use
**Revoke preview** to delete it immediately.

## Privacy and security

Publishing is never automatic. Before each publish or update, the extension
explains that the rendered HTML and inline local images will be uploaded to
temp.md and accessible to anyone who has the unlisted URL.

The extension stores the scoped update/revoke capability in Yank Note's local
extension storage. It is not an account token and applies only to one preview,
but it should still be treated as a secret. It is never placed in the public URL,
rendered document, telemetry, or logs.

The extension exports one self-contained `index.html` file. The temp.md per-file
limit is 10 MB, so documents whose inline images push the export above that size
are rejected before upload.

## Development

```bash
npm install
npm run check
```

The API workflow has unit coverage for create, same-link update, skipped uploads,
structured errors, size validation, and revoke.

## License

MIT
