const fs = require('fs');
const path = require('path');

fs.writeFile(
    path.join(__dirname, 'project-dist', `bundle.css`), '',
    (err) => { if(err) console.log('fac');       
    }
);


fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if(err) {console.log('error');}
    else{
        files.forEach((file) => {
            if(path.extname(file).slice(1) === 'css'){
                //console.log('yes')
                let readFile = fs.createReadStream(path.join(__dirname, 'styles', `${file}`), 'utf-8');
                readFile.on('data', (data) => {
                    fs.appendFile(path.join(__dirname, 'project-dist', `bundle.css`),
                        data, (error) => { if (error)  console.log(error); });
                })
            }
        })
    }
})