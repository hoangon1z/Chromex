const services = {
  website: 'Thiết kế Website', uiux: 'Thiết kế UI/UX', landing: 'Landing Page',
  webapp: 'Phát triển Web App', ecommerce: 'E-commerce', seo: 'SEO & Marketing', branding: 'Branding & Logo',
}

export default async function contact(req, res) {
  const reply = (status, message) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
    res.end(JSON.stringify({ success: status === 200, message }))
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return reply(405, 'Phương thức không được hỗ trợ.')
  }
  if (!req.headers['content-type']?.includes('application/json')) return reply(415, 'Dữ liệu không hợp lệ.')
  let body
  try {
    if (req.body && typeof req.body === 'object') body = req.body
    else {
      let raw = ''
      for await (const chunk of req) {
        raw += chunk
        if (Buffer.byteLength(raw) > 16000) return reply(413, 'Nội dung quá dài.')
      }
      body = JSON.parse(raw)
    }
  } catch { return reply(400, 'Dữ liệu không hợp lệ.') }
  if (!body || Array.isArray(body)) return reply(400, 'Dữ liệu không hợp lệ.')
  const limits = { name: 100, email: 254, phone: 30, service: 30, message: 2500 }
  const data = {}
  for (const [key, limit] of Object.entries(limits)) {
    if (body[key] !== undefined && typeof body[key] !== 'string') return reply(400, 'Dữ liệu không hợp lệ.')
    data[key] = (body[key] || '').trim()
    if (data[key].length > limit) return reply(400, 'Nội dung vượt quá độ dài cho phép.')
  }
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !Object.hasOwn(services, data.service) || !data.message) {
    return reply(400, 'Vui lòng nhập đầy đủ họ tên, email hợp lệ, dịch vụ và nội dung.')
  }
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) return reply(503, 'Hệ thống liên hệ đang bảo trì. Vui lòng thử lại sau.')
  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `📩 Liên hệ mới từ Chromex\n\nHọ tên: ${data.name}\nEmail: ${data.email}\nĐiện thoại: ${data.phone || 'Không cung cấp'}\nDịch vụ: ${services[data.service]}\n\nNội dung:\n${data.message}`,
        link_preview_options: { is_disabled: true },
      }),
    })
    const result = await response.json()
    if (!response.ok || !result.ok) return reply(502, 'Chưa gửi được yêu cầu. Vui lòng thử lại hoặc liên hệ qua điện thoại.')
    return reply(200, 'Liên hệ thành công! Cảm ơn bạn, chúng tôi sẽ phản hồi trong vòng 24 giờ.')
  } catch { return reply(502, 'Kết nối bị gián đoạn. Vui lòng thử lại hoặc liên hệ qua điện thoại.') }
}
