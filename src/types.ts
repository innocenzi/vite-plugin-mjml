import { MJMLParsingOptions } from 'mjml-core'
import { Logger } from 'vite'

export interface Options {
	input: string
	output: string
	extension: string
	exclude: string | string[]
	watch: boolean
	log: boolean
	mjml?: MJMLParsingOptions
}

export interface CompileOptions extends Options {
	logger: Logger
	building: boolean
}
