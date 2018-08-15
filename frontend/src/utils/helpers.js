export function formatDateTimeAt(timestamp) {
  const newDate = new Date(timestamp);
  const date = newDate.toLocaleDateString();
  const time = newDate.toLocaleTimeString();

  return `at ${date} ${time}`;
}
