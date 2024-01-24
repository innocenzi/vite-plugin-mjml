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
				input: path.resolve(fixtures, 'valid'),
				output,
			}),
		],
	})

	expect(fs.existsSync(path.resolve(output, 'mail', 'mail.html'))).toBe(true)
})

test('it can exclude directories', async() => {
	expect(fs.existsSync(output)).toBe(false)

	await build({
		root: fixtures,
		logLevel: 'silent',
		plugins: [
			mjml({
				log: false,
				extension: '.html',
				input: path.resolve(fixtures, 'has-excludes'),
				output,
				exclude: [path.resolve(fixtures, 'has-excludes', 'partials')],
			}),
		],
	})

	expect(fs.existsSync(path.resolve(output, 'mail', 'mail.html'))).toBe(true)
	expect(!fs.existsSync(path.resolve(output, 'partials', '_foo.html'))).toBe(true)
})

test('it throws on compilation errors', async() => {
	expect(fs.existsSync(output)).toBe(false)

	await expect(async() => await build({
		root: fixtures,
		logLevel: 'silent',
		plugins: [
			mjml({
				log: false,
				extension: '.html',
				input: path.resolve(fixtures, 'invalid'),
				output,
			}),
		],
	})).rejects.toThrow('Malformed MJML. Check that your structure is correct and enclosed in <mjml> tags.')

	expect(fs.existsSync(output)).toBe(false)
})
