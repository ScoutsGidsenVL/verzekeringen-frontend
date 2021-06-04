export const routeDetailLinkBasedOnType = (insuranceType: any) => {
  switch (insuranceType) {
    case 'TypeEenmaligeActiviteit':
      return '/eenmalige-activiteit-detail'
    case 'TypeTijdelijkeVerzekering':
      return '/tijdelijke-verzekering-niet-leden-detail'
    case 'TypeEthiasAssistanceZonderAuto':
      return '/one-time-activity-detail'
    default:
      return '/home'
  }
}
