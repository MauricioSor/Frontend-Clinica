export const dateParse=(date)=>{
    const newDate=date.split('T')
    return newDate[0]
}
export const timeParse=(date)=>{
    const newTime=date.split('T')
    const newFormatTime=newTime[1].split('.')
    return newFormatTime[0]
}