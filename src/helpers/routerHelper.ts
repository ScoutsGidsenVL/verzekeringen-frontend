export const routeLinkBasedOnType = (insuranceType: any) => {
  switch (insuranceType) {
    case 'TypeEenmaligeActiviteit':
      return '/one-time-activity-detail'
    case 'TypeTijdelijkeVerzekering':
      return '/one-time-activity-detail'
    case 'TypeEthiasAssistanceZonderAuto':
      return '/one-time-activity-detail'
    default:
      return '/home'
  }
}
