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

<p align="center">
	<br />
	<br />
	·
	<br />
	<br />
	<sub>Built with ❤︎ by <a href="https://github.com/enzoinnocenzi">Enzo Innocenzi</a>
</p>
