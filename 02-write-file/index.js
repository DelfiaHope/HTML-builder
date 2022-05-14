const fs = require('fs');
const path = require('path');
const readline = require('readline');


fs.writeFile(
    path.join(__dirname, 'notes.txt'), '',
    (err) => {
        if (err) throw err;       
    }
);

const { stdin, stdout, exit } = process;

stdout.write('Where are you from?\n')

stdin.on('data', data => {
  const food = data.toString();  
 if(food.toString().trim() === 'exit') closeInput();
  fs.appendFile(
    path.join(__dirname, 'notes.txt'), `${food}`,
    err => {
        if (err) throw err;        
    }
  );  

});
const closeInput = () => {
  stdout.write('\nThis is a very beautiful place!\n');
  exit();

}
process.on('SIGINT', closeInput);