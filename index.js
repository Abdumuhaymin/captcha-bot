import { Telegraf, Markup } from "telegraf";
import dotenv from "dotenv";
import { generateCaptcha } from "./utils/captchaGenerator.js";
import {
  saveCaptcha,
  getCaptcha,
  deleteCaptcha,
} from "./utils/sessionManager.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Tasodifiy tugmalar yaratish
function generateOptions(correctAnswer) {
  const fakeAnswers = new Set();
  while (fakeAnswers.size < 3) {
    const fake = Math.random().toString(36).substring(2, 8).toUpperCase();
    if (fake !== correctAnswer) fakeAnswers.add(fake);
  }

  const options = [...fakeAnswers, correctAnswer];
  return options.sort(() => Math.random() - 0.5); // Shuffle
}

bot.start(async (ctx) => {
  const { imageBuffer, text } = await generateCaptcha();
  await saveCaptcha(ctx.from.id, text);

  const options = generateOptions(text);
  const buttons = options.map((opt) =>
    Markup.button.callback(opt, `answer:${opt}`)
  );

  await ctx.sendPhoto(
    { source: imageBuffer },
    {
      caption: "🔐 Iltimos, rasmda ko‘rsatilgan kodni tanlang:",
      reply_markup: {
        inline_keyboard: [
          options.map((opt) => ({
            text: opt,
            callback_data: `answer:${opt}`,
          })),
        ],
      },
    }
  );
});

bot.on("callback_query", async (ctx) => {
  const userId = ctx.from.id;
  const expected = await getCaptcha(userId);
  const selected = ctx.callbackQuery.data.split(":")[1];

  if (!expected) {
    await ctx.answerCbQuery("Iltimos, /start buyrug'ini bosing.");
    return;
  }

  if (selected === expected) {
    const invite = await ctx.telegram.createChatInviteLink(
      process.env.CHANNEL_ID,
      {
        member_limit: 1,
        expire_date: Math.floor(Date.now() / 1000) + 10, // 10 daqiqa
        name: `captcha-${userId}`,
      }
    );

    await ctx.editMessageCaption(
      "✅ To‘g‘ri! Kanalga qo‘shilish uchun tugmani bosing:",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "📥 Kanalga qo‘shilish", url: invite.invite_link }],
          ],
        },
      }
    );
    await ctx.answerCbQuery(); // Callbackni tozalash uchun
    deleteCaptcha(userId);
  } else {
    await ctx.answerCbQuery("❌ Noto‘g‘ri javob.");
    await ctx.reply("❌ Noto‘g‘ri. Iltimos, /start ni qayta bosing.");
    deleteCaptcha(userId);
  }
});

bot.launch();
console.log("🤖 Bot tugmali CAPTCHA bilan ishga tushdi!");
