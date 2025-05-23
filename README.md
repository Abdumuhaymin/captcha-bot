# 🤖 Telegram CAPTCHA Bot

Telegram CAPTCHA bot foydalanuvchini tekshiradi va testdan o'tganidan so'ng unga yopiq (private) kanalga havola yuboradi.

## 📦 Texnologiyalar

- Node.js
- Telegraf.js
- svg-captcha
- dotenv

## 🎯 Funktsiyalar

- Foydalanuvchidan CAPTCHA kodini kiritishni so‘raydi
- To‘g‘ri javob bo‘lsa, kanalga taklif havolasini yuboradi
- Xatolik bo‘lsa, javobni rad etadi
- (Ixtiyoriy) Redis orqali session saqlash

## 📁 Loyiha tuzilishi

telegram-captcha-bot/
├── node_modules/
├── utils/
│ ├── captchaGenerator.js
│ └── sessionManager.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md

## ⚙️ O‘rnatish

1. Repository’ni klon qiling:

````bash
git clone https://github.com/YOUR_USERNAME/telegram-captcha-bot.git
cd telegram-captcha-bot
Paketlarni o‘rnating:

bash
Copy
Edit
npm install
.env faylini yarating va quyidagilarni qo‘shing:

ini
Copy
Edit
BOT_TOKEN=123456:ABCDEF123456...
CHANNEL_LINK=https://t.me/+invite_link_here
Botni ishga tushuring:


node index.js
🚀 Deploy qilish (masalan Railway yoki Render)
GitHub’ga push qiling.

Railway/Render hisob oching.

GitHub’ni ulang va environment variable’larni sozlang.

Auto deploy tayyor!

🛡 Eslatma
Kanal private bo'lishi kerak

CHANNEL_LINK — kanalning invite havolasi bo'lishi zarur

Botga kanalga a’zo qilish huquqi shart emas

© 2025 Abdumuhaymin Abdurahmonov — @nothing_cs



---

## 📄 `.gitignore`

```gitignore
# Node modules
node_modules/

# Dotenv file
.env

# Logs
logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
````
