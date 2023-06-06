module.exports  =  (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, (product && product.productName) || '');
    output = output.replace(/{%IMAGE%}/g, (product && product.image) || '');
    output = output.replace(/{%PRICE%}/g, (product && product.price) || '');
    output = output.replace(/{%FROM%}/g, (product && product.from) || '');
    output = output.replace(/{%NUTRIENTS%}/g, (product && product.nutrients) || '');
    output = output.replace(/{%QUANTITY%}/g, (product && product.quantity) || '');
    output = output.replace(/{%DESCRIPTION%}/g, (product && product.description) || '');
    output = output.replace(/{%ID%}/g, (product && product.id) || '');
  
    if (product && !product.organic) {
      output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
  
    return output;
  }
// annoynmous fucntion - there is no name to the fucntion 