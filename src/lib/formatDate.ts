export function formatDate(dateString: string) {
  let normalizedDate = dateString.replace(
    /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
    (_, year, month, day) =>
      `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
  )

  return new Date(`${normalizedDate}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
