#zenstorejs

zenstorejs is the npm package for [zenstore](https://github.com/johannesboyne/zenstore). And it is very easy to use:

```javascript
// example: store something
zenstorejs.store('http://localhost:1337/e90f161ac64790b7dbe155201ff4765a7a0de4c9',
                 JSON.stringify({
                   mytest: 1
                 }),
                 function (err, ret) {
                   zenstorejs.get('http://localhost:1337/e90f161ac64790b7dbe155201ff4765a7a0de4c9', function (err, ret2) {
                     t.equal(ret, ret2);
                     t.equal(ret, JSON.stringify({mytest: 1}));
                     t.end();
                   });
                 });

// example: writing via pipe
zenstorejs.createWritePipe('http://localhost:1337/e90f161ac64790b7dbe155201ff4765a7a0de4c9', function (zenPipe) {
  zenPipe.write('{"testtest": 123}');
});

// example: listining on a zenstore storage 
zenstorejs.follow(argv.follow, argv.at, function (stream) {
  stream.on('data', function (data) {
    console.log('->'.bold.blue + ' received data:'.blue, data.toString().grey);
  });
});
```

BTW: Have you looked at [zenstorecli](https://github.com/johannesboyne/zenstorecli)?
