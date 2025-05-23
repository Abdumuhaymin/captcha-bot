const session = new Map();

export async function saveCaptcha(userId, value) {
  session.set(userId, value);
}

export async function getCaptcha(userId) {
  return session.get(userId);
}

export async function deleteCaptcha(userId) {
  session.delete(userId);
}
