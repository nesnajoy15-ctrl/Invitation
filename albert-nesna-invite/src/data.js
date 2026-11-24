export const COUPLE = { groom: 'Albert', bride: 'Nesna' }

export const FAMILIES = {
  groom: { relation: 'Son of', parents: 'Mr. Johnson & Mrs. Molly', house: 'Manjaly House' },
  bride: { relation: 'Daughter of', parents: 'Mr. Joy & Mrs. Molly', house: 'Thakkolkkaran House' },
}

export const VENUE = {
  name: 'LF Convention Centre',
  place: 'Potta, Chalakudy',
  full: 'LF Convention Centre, Potta, Chalakudy, Kerala',
  mapsUrl:
    'https://maps.app.goo.gl/z3eQsyobRhc2967M9'),
}

// Times are IST (UTC+05:30). start/end are UTC for calendar files.
export const EVENTS = [
  {
    key: 'betrothal',
    title: 'Betrothal',
    day: '20',
    weekday: 'Wednesday',
    monthYear: 'January 2027',
    time: '10:30 AM',
    start: '20270120T050000Z',
    end: '20270120T070000Z',
    note: 'The families meet to bless the promise.',
  },
  {
    key: 'wedding',
    title: 'Wedding',
    day: '24',
    weekday: 'Sunday',
    monthYear: 'January 2027',
    time: '12:05 PM',
    start: '20270124T063500Z',
    end: '20270124T093500Z',
    note: 'Two families, one celebration.',
  },
]

export const WEDDING_AT = new Date('2027-01-24T12:05:00+05:30')
