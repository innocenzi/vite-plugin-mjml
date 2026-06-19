<p align="center">
	<h2 align="center">MJML plugin for Vite</h2>

<p align="center">
	<a href="https://github.com/innocenzi/vite-plugin-mjml/actions/workflows/test.yaml"><img alt="Status" src="https://github.com/innocenzi/vite-plugin-mjml/actions/workflows/test.yaml/badge.svg"></a>
	<span>&nbsp;</span>
	<a href="https://github.com/innocenzi/vite-plugin-mjml/releases"><img alt="version" src="https://img.shields.io/github/v/release/innocenzi/vite-plugin-mjml?include_prereleases&label=version&logo=github&logoColor=white"></a>
	<br />
	<br />
	<p align="center">
		A plugin for compiling <a href="https://mjml.io/"><code>mjml</code></a> files in your Vite pipeline.
	</p>
	<pre><div align="center">npm i -D vite-plugin-mjml</div></pre>
</p>

&nbsp;

## Usage

Install `vite-plugin-mjml` and add it to your Vite configuration:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import laravel from 'vite-plugin-laravel'
import mjml from 'vite-plugin-mjml'

export default defineConfig({
	plugins: [
		laravel(),
		vue(),
		mjml({
			input: 'resources/mail',
			output: 'resources/views/emails',
			extension: '.blade.php',
		}),
	],
})
```

When running `vite dev`, all `.mjml` files in your `input` directory will be compiled to `output` when saved. 
Similarly, when building for production, all files in `input` will be compiled as well.

> For instance, `resources/mail/onboarding/welcome.mjml` would be written to `resources/views/emails/onboarding/welcome.blade.php`.

&nbsp;

## Options

| Option      | Type                 | Description                                                                     | Default                  |
| ----------- | -------------------- | ------------------------------------------------------------------------------- | ------------------------ |
| `input`     | `string`             | Path to the directory in which `.mjml` files are stored                         | `resources/mail`         |
| `output`    | `string`             | Path to the directory in which compiled files will be written                   | `resources/views/emails` |
| `extension` | `string`             | Extension that will be used by compiled `.mjml` files                           | `.blade.php`             |
| `mjml`      | `MJMLParsingOptions` | Specific MJML [compiler options](https://documentation.mjml.io/#inside-node-js) | `{}`                     |
| `watch`     | `boolean`            | Whether to watch and compile on the fly in development mode                     | `true`                   |
| `log`       | `boolean`            | Whether to print output in the console                                          | `true`                   |
| `minify`    | `boolean`            | Minify HTML output using htmlnano                                               | `false`                  |
| `minifyOptions` | `MJMLMinifyOptions` | Options for htmlnano/cssnano when minify is enabled                            | `{}`                     |
| `validationLevel` | `'strict' \| 'soft' \| 'skip'` | How to validate MJML                                     | `'soft'`                 |
| `filePath`  | `string`             | Base path for resolving `mj-include` paths                                      | `'.'`                    |
| `ignoreIncludes` | `boolean`          | Ignore `mj-include` elements (security: defaults to `true` in MJML 5)          | `false`                  |
| `useMjmlConfigOptions` | `boolean`      | Use options from `.mjmlconfig` file                                            | `false`                  |

### Security Note: `mj-include` Handling

MJML 5.x (used since v0.5.0) changed the default behavior for `mj-include` to be **disabled by default** for security (fixes CVE-2025-67898). If your templates use `mj-include`, you must explicitly enable it by setting `ignoreIncludes: false` and providing a `filePath` for resolving include paths:

```ts
mjml({
  // ...other options
  ignoreIncludes: false,  // enable includes
  filePath: 'resources/mail',  // required: base path for resolving includes
})
```

&nbsp;

## Migration from v0.4.x (MJML 4) to v0.5.x (MJML 5)

This version upgrades the underlying MJML engine from 4.x to 5.x. Key breaking changes:

- **Node.js 20+ required** (Node 16/18 no longer supported)
- **Vite 5+ required** (Vite 3/4 no longer supported)
- **`mj-include` disabled by default** — see Security Note above
- **HTML output format changed** — MJML 5 uses htmlnano/cssnano instead of html-minifier/js-beautify
- **Async compilation** — internal compilation is now async (transparent to most users)

See the [MJML 5 Upgrade Guide](https://github.com/mjmlio/mjml/releases/tag/v5.0.0) for full details.

<p align="center">
	<br />
	<br />
	·
	<br />
	<br />
	<sub>Built with ❤︎ by <a href="https://twitter.com/enzoinnocenzi">Enzo Innocenzi</a>
</p>
