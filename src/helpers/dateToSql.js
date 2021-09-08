//Convert Javascript Date to SQL Date
export const dateToSql = (date) => {
	return date.getFullYear() + '-' + (date.getMonth()+1)+ '-' + date.getDate();
}