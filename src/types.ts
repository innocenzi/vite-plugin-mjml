import { MJMLParsingOptions, MJMLMinifyOptions } from 'mjml-core'
import { Logger } from 'vite'

export interface Options {
	input: string
	output: string
	extension: string
	exclude: string | string[]
	watch: boolean
	log: boolean
	mjml?: MJMLParsingOptions
	minify?: boolean
	minifyOptions?: MJMLMinifyOptions
	validationLevel?: 'strict' | 'soft' | 'skip'
	filePath?: string
	ignoreIncludes?: boolean
	useMjmlConfigOptions?: boolean
}

export interface CompileOptions extends Options {
	logger: Logger
	building: boolean
}
