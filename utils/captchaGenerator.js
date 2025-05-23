import svgCaptcha from "svg-captcha";
import sharp from "sharp";

export async function generateCaptcha() {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true,
    background: "#ccf",
  });

  const pngBuffer = await sharp(Buffer.from(captcha.data)).png().toBuffer();

  return {
    imageBuffer: pngBuffer,
    text: captcha.text.toUpperCase(), // Yagona formatda solishtirish uchun
  };
}
