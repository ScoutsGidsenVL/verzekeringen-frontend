export const routeDetailLinkBasedOnType = (insuranceType: any) => {
  switch (insuranceType) {
    case 'TypeEenmaligeActiviteit':
      return '/eenmalige-activiteit-detail'

    case 'TypeTijdelijkeVerzekering':
      return '/tijdelijke-verzekering-niet-leden-detail'

    case 'TypeEthiasAssistanceMetAuto':
      return '/reisbijstand-met-auto-detail'

    case 'TypeEthiasAssistanceZonderAuto':
      return '/reisbijstand-zonder-auto-detail'

    case 'TypeTijdelijkeAutoverzekering':
      return '/niets'

    case 'TypeEvenementenVerzekering':
      return '/evenementen-verzekering-detail'

    default:
      return '/home'
  }
}
