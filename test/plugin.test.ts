import path from 'node:path'
import fs from 'node:fs'
import { beforeEach, expect, test } from 'vitest'
import { build } from 'vite'
import mjml from '../src'

const output = path.resolve(__dirname, 'output')
const fixtures = path.resolve(__dirname, 'fixtures')

beforeEach(() => fs.rmSync(output, { recursive: true, force: true }))

test('it compiles', async() => {
	expect(fs.existsSync(output)).toBe(false)

	await build({
		root: fixtures,
		logLevel: 'silent',
		plugins: [
			mjml({
				log: false,
				extension: '.html',
				input: fixtures,
				output,
			}),
		],
	}) as any

	expect(fs.existsSync(path.resolve(output, 'mail', 'mail.html'))).toBe(true)
})
