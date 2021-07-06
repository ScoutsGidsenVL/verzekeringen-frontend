import moment from 'moment'

export const formatDate = (startDate: string, endDate: string): string => {
  return moment(startDate).format('DD MMM YYYY') + ' - ' + moment(endDate).format('DD MMM YYYY')
}

export const formatEventDate = (startDate: string, startTime: string, endDate: string, endTime: string): string => {
  return moment(startDate).format('DD MMM YYYY ') + startTime + ' - ' + moment(endDate).format('DD MMM YYYY ') + endTime
}

export const formatCreatedOn = (createdOn: string): string => {
  return moment(createdOn).format('DD MMM YYYY')
}

export const formatSingleDate = (createdOn: string): string => {
  return moment(createdOn).format('DD MMM YYYY')
}
