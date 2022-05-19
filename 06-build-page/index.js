const fs = require('fs');
const path = require('path');


//создаем папку project-dist
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) { 
      console.error(err);
    }    
  });

//бандлим все стили в project-dist/style.css
fs.writeFile(
  path.join(__dirname, 'project-dist', `style.css`), '',
  (err) => { if(err) console.log('fac');       
  }
);
fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if(err) console.log('error');    
    files.forEach((file) => {
        if(path.extname(file).slice(1) === 'css'){
            
            let readFile = fs.createReadStream(path.join(__dirname, 'styles', `${file}`), 'utf-8');
                readFile.on('data', (data) => {
                    fs.appendFile(path.join(__dirname, 'project-dist', `style.css`),
                        data, (error) => { if (error)  console.log('error'); });
                })
        }
    })
    
})


// копируем assets
const copyAssets = () => {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
      if (err) console.error(err);     
    });
    fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
        if(err) console.log('error');
        files.forEach((file) => {
          fs.readdir(path.join(__dirname, 'assets', `${file}`),(err, directs) => {
            if(err) console.log('error');
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', `${file}`), { recursive: true }, (err) => {
              if (err) console.error(err);     
            });
            directs.forEach((direct) => {
              fs.copyFile(
                path.join(__dirname, 'assets', `${file}`, `${direct}`), 
                path.join(__dirname, 'project-dist', 'assets', `${file}`, `${direct}`), 
                err => {if(err)console.log('fac1') })
            })

          });

        }); 

    })
}
copyAssets()


//Заменяет шаблонные теги в файле

function changeDivInIndex() {
  fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err) => {
    if (err) console.log(err);
    fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf8', (err, data) => {
      if(err) console.log(err);
      fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true},(err, divs) => {
        if (err) console.log(err);

        divs.forEach((div) => {
          fs.readFile(path.join(__dirname, 'components', div.name), 'utf8', (err, divContent) => {
            if(err) console.log(err);
            let divName = `{{${div.name.split('.')[0]}}}`;
            data = data.replace(divName, divContent);
            fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data, (err) => {
              if(err) console.log(err);
            });
          });
          
        });
        
      });
      
    });
    
  });
}
changeDivInIndex();
