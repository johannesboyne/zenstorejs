#zenstorejs

zenstorejs is the npm package for [zenstore](https://github.com/johannesboyne/zenstore). And it is very easy to use:

```javascript
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
  // ---
  zenstorejs.createWritePipe('http://localhost:1337/e90f161ac64790b7dbe155201ff4765a7a0de4c9', function (zenPipe) {
    zenPipe.on('end', function () {
      zenstorejs.get('http://localhost:1337/e90f161ac64790b7dbe155201ff4765a7a0de4c9', function (err, ret) {
        t.equal(ret, JSON.stringify({testtest: 123}));
        t.end();
      });
    });
    zenPipe.end('{"testtest": 123}');
  });
```

BTW: Have you looked at [zenstorecli](https://github.com/johannesboyne/zenstorecli)?
