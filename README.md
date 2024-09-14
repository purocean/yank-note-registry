# Yank Note Extension Registry

English | [简体中文](./README_ZH-CN.md)

This is the registration center for Yank Note extensions. If you want to register your own extension to the Yank Note extension collection, please follow the steps below:

1. Publish the extension to the NPM repository, noting the following:
    1. The package name must start with `yank-note-extension-`
    2. Do not embed local images in `README.md`; use online images instead, otherwise, they will not be displayed correctly
2. Fork this project
3. Edit `extension.json`, adding your extension to `$.registry`
4. Create a new Pull Request, and attach the relevant description

After the Pull Request is merged, users will be able to see your extension in Yank Note.

If you need to update the extension, repeat the above steps.
