export default function getEnvName() {
  const match = String(window.location.search).match(/[&?]env=(\w+)/);
  if (match) {
    return match[1];
  }
  return 'production';
}
