const fs = require('fs');
const path = require('path');
  
fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) { 
      console.error(err);
    }    
  });

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
if(err) {console.log('error');}
else{
    files.forEach((file) => {
        fs.writeFile(
            path.join(__dirname, 'files-copy', `${file}`), '',
            (err) => { if(err) console.log('fac0');       
            }
        );
        fs.copyFile(
            path.join(__dirname, 'files', `${file}`), 
            path.join(__dirname, 'files-copy', `${file}`), err => {if(err)console.log('fac1') })
    })  
}
})
