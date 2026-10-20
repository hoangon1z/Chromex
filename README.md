# Chromex

Website React + Vite với form liên hệ gửi thông báo về Telegram.

## Chạy tại máy

Yêu cầu Node.js 22.12 trở lên.

1. `npm ci`
2. Sao chép `.env.example` thành `.env.local`, nhập `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID`.
3. Admin mở bot Telegram và nhấn **Start** trước khi nhận tin nhắn.
4. `npm run dev`

Form gọi `POST /api/contact`. API kiểm tra dữ liệu và chờ Telegram xác nhận trước khi trả kết quả thành công. Khi lỗi, nội dung form được giữ lại để người dùng thử lại.

## Triển khai Vercel

Import repository vào Vercel, chọn framework Vite. Trong Settings → Environment Variables, cấu hình `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID` cho môi trường cần chạy, sau đó deploy. `api/contact.js` chạy dưới dạng serverless function; `vercel.json` đã được cấu hình.

Không thêm tiền tố `VITE_` cho token và không commit `.env.local`. Token phải được cấu hình riêng trên hosting. GitHub Pages chỉ phục vụ trang tĩnh nên không chạy được API này.

## Kiểm tra

- `npm test`: kiểm tra xác thực, lỗi Telegram, lỗi mạng và trường hợp gửi thành công bằng API giả lập.
- `npm run build`: kiểm tra TypeScript và build website.
- `npm run preview`: xem bản build tại máy, có API Telegram dùng biến môi trường cục bộ.

API sử dụng phương thức [sendMessage của Telegram Bot API](https://core.telegram.org/bots/api#sendmessage).
