export const computeUnits = (terms) => {
    let result = 0;
    for(let i in terms){
      for(let j in terms[i].classes){
        result += terms[i].classes[j].units
      }
    }
    return result
}
