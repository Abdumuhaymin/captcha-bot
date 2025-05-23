const sessions = new Map();

export function saveCaptcha(userId, text) {
  sessions.set(userId, text);
}

export function getCaptcha(userId) {
  return sessions.get(userId);
}

export function deleteCaptcha(userId) {
  sessions.delete(userId);
}
