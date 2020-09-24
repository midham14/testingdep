const {Product} = require('./models')
const fs = require('fs')

Product.findAll()
    .then(data=>{
        let newData = []
        data.forEach(val=>{
            newData.push({name:val.name,description:val.description,price:val.price,image:val.image})
        })
       fs.writeFileSync('./product.json', JSON.stringify(newData,null,2),'utf8')
    })
    .catch(err=>{
        console.log(err)
    })