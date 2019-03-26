function CPFValidateFirstDigit(cpf) {
	let arrCpf = cpf.toString().split('', 11)
  if(arrCpf.length === 11 || arrCpf.length > 11) {
  
    let cpfWithoutDigit = arrCpf.splice(0, 9)
    let iArr = 0
    let total = 0
    let sumResult = []
    
    for(let i = 10; i > 1; --i) {
      sumResult.push(cpfWithoutDigit[iArr] * i)
      iArr++
    }
    sumResult.forEach((num, i)=> {
      total += parseFloat(num)
    })
    
    let digitValidator = 11 - (total % 11 )
    let firstDigit = validatorFirstDigit(digitValidator)
    return cpf.toString().substring(9, 10) != firstDigit ? false : true
  }
  return false
}

function CPFValidateLastDigit(cpf) {
  let arrCpf = cpf.toString().split('', 11)
    if(arrCpf.length === 11) {
        let cpfWithoutLastDigit = arrCpf.splice(0, 10)
        let iArr = 0
        let total = 0
        let sumResult = []
        
        for(let i = 11; i > 1; --i) {
            sumResult.push(cpfWithoutLastDigit[iArr] * i)
        iArr++
        }
        sumResult.forEach(num => {
                total += parseFloat(num)
            })
        let digitToValidate = 11 - (total % 11) 
        return cpf.toString().substring(10, 11) == digitToValidate ? true : false
  } else {return false}
}

function validatorFirstDigit(digit) {
	return digit > 9 ? '0' : digit
}

module.exports = function CPFValidate(cpf) {
  if(CPFValidateFirstDigit(cpf) && CPFValidateLastDigit(cpf) && cpf.toString().split('').length === 11) return true
  else return false
}