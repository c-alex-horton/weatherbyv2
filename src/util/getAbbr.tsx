import states from 'states-us'

const getAbbr = (region: string) => {
  const abbr = states.filter((x) => x.name === region)
  if (abbr.length >= 1) {
    return abbr[0].abbreviation
  }

  return region
}

export default getAbbr
