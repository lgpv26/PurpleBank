const DDDs = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99]

export function phoneValidation(phoneNumber) {
    let phoneComplete = phoneNumber.replace(/\D/g, '')
    
    //se começar com 0, remove o 0
    if(phoneComplete.startsWith(0)) {
        phoneComplete = phoneComplete.replace(0, '')
    }
    
    //verifica a quantidade o tamanho do numero
    if(phoneComplete.length > 11 || phoneComplete.length < 10) return false

    let DDD = phoneComplete.slice(0, 2)

    //verifica se o DDD é válido
    if(!dddIsValid(DDD)) return false

    //let phone = phoneComplete.slice(2)
    
    return true
}


function dddIsValid(dddNumber) {
    return DDDs.some((value) => {
        if(value.toString() === dddNumber) return true
    })
}
