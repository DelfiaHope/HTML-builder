
const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
    if(err) {console.log('error secret-fold');}   
        files.forEach((file) => {
            if(file.isFile()){
                outputInform(file)               
            }            
        })      
})

  
const outputInform = (file) => {
   
    let result = [];
    
    fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
            if (err) console.log('err output', err);             
            
            result.push(file.name.split('.').slice(0, -1).join('.'))
            result.push(path.extname(file.name).slice(1));
            result.push(Math.round(stats.size/1024) + 'Kb');
            
            
        console.log(result.join(' - ')); 
    })   
    

};

