
function MinValue(data){
    var minValue = data[0]
    for(var i = 0; i<=data.length; i++){
       if(data[i]<minValue)
       minValue = data[i]
    }
    return minValue
}

module.exports = MinValue