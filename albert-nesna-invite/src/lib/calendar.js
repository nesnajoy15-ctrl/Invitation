import { VENUE } from '../data'

const summary = (e) => `${e.title} of Albert & Nesna`
const details = (e) =>
  `${e.title} of Albert & Nesna at ${VENUE.name}, ${VENUE.place}. ${e.time} IST. Directions: ${VENUE.mapsUrl}`

export function googleCalendarUrl(e) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: summary(e),
    dates: `${e.start}/${e.end}`,
    details: details(e),
    location: VENUE.full,
    ctz: 'Asia/Kolkata',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')

export function downloadIcs(e) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Albert and Nesna//Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${e.key}-2027-albert-nesna@invitation`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${e.start}`,
    `DTEND:${e.end}`,
    `SUMMARY:${esc(summary(e))}`,
    `LOCATION:${esc(VENUE.full)}`,
    `DESCRIPTION:${esc(details(e))}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(summary(e))} tomorrow`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `albert-nesna-${e.key}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
