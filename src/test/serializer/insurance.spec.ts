import { insurance, insuranceSerializer } from '../../serializer/insurance'

export const insuranceInputResult: insurance = {
  id: 7,
  date: 'vrijdag',
  group: 'A',
  type: 'Reisbijstand',
}

const mockConstructionSiteInput = {
  id: 7,
  date: 'vrijdag',
  group: 'A',
  type: 'Reisbijstand',
  address: {
    street: 'Langerbruggekaai',
    number: '3',
    box: null,
    zipCode: null,
    city: 'Gent',
    country: 'Belgie',
    countryCode: 'BE',
    latitude: null,
    longitude: null,
  },
  startDate: '2021-01-01T00:00:00',
  endDate: '2021-12-31T00:00:00',
  principalContractor: {
    vatIdentifier: 'BE0541504874',
    name: 'Daboe BV',
  },
  builder: {
    vatIdentifier: 'BE0123456789',
    name: 'Builder name (TODO)',
  },
  alerts: [
    {
      type: 1,
      count: 5,
    },
    {
      type: 2,
      count: 8,
    },
  ],
}

describe('Insurance serializer', () => {
  it('insuranceSerializer', () => {
    const result = insuranceSerializer(mockConstructionSiteInput)
    expect(result).toEqual(insuranceInputResult)
  })
})
