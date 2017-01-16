var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

for(var i in argv){
  console.log(i);
  console.log(argv[i]);
}
// console.dir(argv.x);
//test
// node mintest.js -x 45 6 -y 4 -n5 -abc --beep=boop foo bar baz
