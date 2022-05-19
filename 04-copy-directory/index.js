const fs = require('fs');
const path = require('path');


fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
    if (err) console.log(err);        
});

fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
  if(err) console.log(err);
    files.forEach((file) => {
      fs.unlink(path.join(__dirname, 'files-copy', `${file}`), (err) => {
        if (err) console.log(err);      
      });
    })

});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
if(err) console.log('error');
    files.forEach((file) => {
        fs.writeFile(
            path.join(__dirname, 'files-copy', `${file}`), '',
            (err) => { if(err) console.log('fac0', err);       
            }
        );
        fs.copyFile(
            path.join(__dirname, 'files', `${file}`), 
            path.join(__dirname, 'files-copy', `${file}`), err => {if(err) console.log('fac1', err) })
    }) 
})
