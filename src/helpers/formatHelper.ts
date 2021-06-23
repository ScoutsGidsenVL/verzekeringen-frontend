import moment from 'moment'

export const formatDate = (startDate: string, endDate: string): string => {
  return moment(startDate).format('DD MMM YYYY') + ' - ' + moment(endDate).format('DD MMM YYYY')
}

export const formatEventDate = (startDate: string, endDate: string): string => {
  return moment(startDate).format('DD MMM YYYY h:mm') + ' - ' + moment(endDate).format('DD MMM YYYY h:mm')
}
