import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	clean: true,
	declaration: true,
	externals: [
		'rollup',
		'vite',
		'mjml',
		'mjml-core'
	],
	rollup: {
		emitCJS: true,
	},
})
