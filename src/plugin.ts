/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
import { Plugin } from 'vite'
import mjml from 'mjml'
import fg from 'fast-glob'
import c from 'picocolors'
import type { CompileOptions, Options } from './types'
import { debug } from './utils'

/**
 * Compiles the given MJML file.
 */
export function compileInput(input: string, options: CompileOptions) {
	debug.compile('Compiling input:', { input, options })

	const log = options.log === false
		? () => {}
		: options.building
			? (text: string) => console.log(`${c.cyan(c.bold('mjml'))} - ${text}`)
			: (text: string) => options.logger.info(text, { timestamp: true })

	const content = fs.readFileSync(input, 'utf-8')

	try {
		const result = mjml(content, options.mjml)
		const outputFile = input
			.replace(options.input, options.output)
			.replace('.mjml', options.extension)

		fs.mkdirSync(path.dirname(outputFile), { recursive: true })
		fs.writeFileSync(outputFile, result.html)

		log(c.gray(`${input} -> ${outputFile} (${fs.statSync(outputFile).size} B)`))
		debug.compile('Compilation done:', { result, outputFile })
	} catch (error: any) {
		debug.compile('An error occured:', error)

		if (options.building) {
			throw error
		}

		options.logger.error('Could not compile MJML file.', { timestamp: true })
		options.logger.error(error)
	}
}

export default function(options: Partial<Options> = {}): Plugin {
	let compileOptions: CompileOptions

	return {
		name: 'mjml',
		configResolved(config) {
			compileOptions = {
				input: 'resources/mail',
				output: 'resources/views/emails',
				extension: '.blade.php',
				logger: config.logger,
				building: config.command === 'build',
				log: true,
				watch: true,
				...options,
			}

			debug.mjml('Configuration resolved:', compileOptions)
		},
		async buildStart() {
			let input: string = compileOptions.input

			if (compileOptions.input.includes('*')) {
				input = compileOptions.input
			} else if (!compileOptions.input.match(/\.mjml/)) {
				input = path.join(compileOptions.input, '**/*.mjml').replace(/\\/g, '/')
			}

			const files = await fg(input)
			debug.mjml('Compiling MJML files:', { input, files })
			files.forEach((file) => compileInput(file, compileOptions))
		},
		configureServer(server) {
			if (compileOptions.watch === false) {
				debug.watch('Watching disabled.')
				return
			}

			function handleReload(path: string) {
				if (!path.includes(compileOptions.input)) {
					return
				}

				if (!path.match(/.mjml/)) {
					return
				}

				debug.watch(`${path} changed, compiling`)

				compileInput(path, compileOptions)
			}

			server.watcher
				.on('add', handleReload)
				.on('change', handleReload)
				.on('unlink', handleReload)

			debug.watch('Configured server.')
		},
	}
}
