import test from 'node:test'
import assert from 'node:assert/strict'
import { Readable } from 'node:stream'
import contact from '../api/contact.js'

const valid = { name: 'Khách kiểm thử', email: 'test@example.com', phone: '0900000000', service: 'website', message: 'Kiểm tra form liên hệ' }
async function request(body, method = 'POST') {
  const req = Readable.from([typeof body === 'string' ? body : JSON.stringify(body)])
  req.method = method
  req.headers = { 'content-type': 'application/json' }
  const res = { setHeader() {}, writeHead(status) { this.status = status }, end(value) { this.body = JSON.parse(value) } }
  await contact(req, res)
  return res
}

test('contact API validates input and reports Telegram delivery accurately', async () => {
  const originalFetch = globalThis.fetch
  const originalToken = process.env.TELEGRAM_BOT_TOKEN
  const originalChat = process.env.TELEGRAM_CHAT_ID
  process.env.TELEGRAM_BOT_TOKEN = 'test-token'
  process.env.TELEGRAM_CHAT_ID = '123'
  let calls = 0
  globalThis.fetch = async (_url, options) => {
    calls++
    const payload = JSON.parse(options.body)
    assert.equal(payload.chat_id, '123')
    assert.ok(payload.text.includes(valid.email))
    assert.ok(payload.text.includes('Thiết kế Website'))
    return { ok: true, json: async () => ({ ok: true }) }
  }
  try {
    assert.equal((await request(valid, 'GET')).status, 405)
    assert.equal((await request('{')).status, 400)
    for (const body of [null, [], { ...valid, email: 'bad' }, { ...valid, service: 'unknown' }, { ...valid, service: 'toString' }, { ...valid, name: '   ' }, { ...valid, message: 'a'.repeat(2501) }, { ...valid, phone: 1 }]) {
      assert.equal((await request(body)).status, 400)
    }
    assert.equal((await request('a'.repeat(16001))).status, 413)
    assert.equal(calls, 0)
    const success = await request(valid)
    assert.equal(success.status, 200)
    assert.equal(success.body.success, true)
    assert.equal(calls, 1)
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ ok: false }) })
    const rejected = await request(valid)
    assert.equal(rejected.status, 502)
    assert.equal(rejected.body.success, false)
    globalThis.fetch = async () => { throw new Error('network failure') }
    assert.equal((await request(valid)).status, 502)
    delete process.env.TELEGRAM_BOT_TOKEN
    assert.equal((await request(valid)).status, 503)
  } finally {
    globalThis.fetch = originalFetch
    if (originalToken === undefined) delete process.env.TELEGRAM_BOT_TOKEN
    else process.env.TELEGRAM_BOT_TOKEN = originalToken
    if (originalChat === undefined) delete process.env.TELEGRAM_CHAT_ID
    else process.env.TELEGRAM_CHAT_ID = originalChat
  }
})
