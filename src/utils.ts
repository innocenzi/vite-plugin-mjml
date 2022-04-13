import makeDebugger from 'debug'

export const debug = {
	mjml: makeDebugger('vite:mjml'),
	compile: makeDebugger('vite:mjml:compile'),
	watch: makeDebugger('vite:mjml:watch'),
}
