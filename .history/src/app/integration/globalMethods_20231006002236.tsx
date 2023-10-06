export function GetDate(date = new Date()){
    let yyyy = date.getFullYear()
    let mm = String(date.getMonth() + 1).padStart(2, '0')
    let dd = String(date.getDate()).padStart(2, '0')
    
    return yyyy + '-' + mm + '-' + dd
}