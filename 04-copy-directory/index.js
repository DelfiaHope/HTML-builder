const fs = require('fs');
const path = require('path');


fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  
  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: false}, (err) => {
     
      
    fs.readdir(path.join(__dirname, 'files'), (err, file) => {
        if(err) console.log(err);          
        
        for(let i = 0; i < file.length; i++) {
            fs.copyFile(
                path.join(__dirname, 'files', `${file[i]}`),
                path.join(__dirname, 'files-copy', `${file[i]}`), (err) => {
                  if(err) console.log(err); 
            });
            
        }
      });  

  })
  
})