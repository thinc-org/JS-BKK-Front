export default function getEnvName() {
  const match = String(window.location.search).match(/[&?]env=(\w+)/);
  if (match) {
    const [, env] = match;
    sessionStorage.JS_BANGKOK_BACKEND_ENV = env;
    return env;
  }
  return sessionStorage.JS_BANGKOK_BACKEND_ENV || 'production';
}
