
test('Array', function () {

  var arr, expected, expectedIndexes, count, f1 = function(){}, f2 = function(){};


  // Using [] or the constructor "new Array" will cause this test to fail in IE7/8. Evidently passing undefined to the
  // constructor will not push undefined as expected, however the length property will still appear as if it was pushed.
  // arr = [undefined, undefined, undefined];
  //
  // However we can do it this way, which is a much more likely user scenario in any case:
  var arrayOfUndefined = [];
  arrayOfUndefined.push(undefined);
  arrayOfUndefined.push(undefined);
  arrayOfUndefined.push(undefined);



  arr = [1,2,3];
  count = 0;

  for(var key in arr){
    count++;
  }

  equalWithWarning(count, 3, 'for..in loops will break on arrays.');


  equal(['a','b','c'].indexOf('b'), 1, 'Array#indexOf | b in a,b,c');
  equal(['a','b','c'].indexOf('b', 0), 1, 'Array#indexOf | b in a,b,c from 0');
  equal(['a','b','c'].indexOf('a'), 0, 'Array#indexOf | a in a,b,c');
  equal(['a','b','c'].indexOf('f'), -1, 'Array#indexOf | f in a,b,c');

  equal(['a','b','c','b'].indexOf('b'), 1, 'Array#indexOf | finds first instance');
  equal(['a','b','c','b'].indexOf('b', 2), 3, 'Array#indexOf | finds first instance from index');

  equal([5,2,4].indexOf(5), 0, 'Array#indexOf | 5 in 5,2,4');
  equal([5,2,4].indexOf(2), 1, 'Array#indexOf | 2 in 5,2,4');
  equal([5,2,4].indexOf(4), 2, 'Array#indexOf | 4 in 5,2,4');
  equal([5,2,4,4].indexOf(4, 3), 3, 'Array#indexOf | 4 in 5,2,4,4 from index 3');

  equal([5,2,4,4].indexOf(4, 10), -1, 'Array#indexOf | 4 in 5,2,4,4 from index 10');
  equal([5,2,4,4].indexOf(4, -10), 2, 'Array#indexOf | 4 in 5,2,4,4 from index -10');
  equal([5,2,4,4].indexOf(4, -1), 3, 'Array#indexOf | 4 in 5,2,4,4 from index -1');

  equal([{ foo: 'bar' }].indexOf({ foo: 'bar' }), -1, 'Array#indexOf | will not find deep objects (use find)');
  equal([{ foo: 'bar' }].indexOf(function(a) { return a.foo === 'bar'; }), -1, 'Array#indexOf | will not run against a function (use find)');

  equal(['a','b','c','d','a','b'].lastIndexOf('b'), 5, 'Array#lastIndexOf | b');
  equal(['a','b','c','d','a','b'].lastIndexOf('b', 4), 1, 'Array#lastIndexOf | b from index 4');
  equal(['a','b','c','d','a','b'].lastIndexOf('z'), -1, 'Array#lastIndexOf | z');

  equal([1,5,6,8,8,2,5,3].lastIndexOf(3), 7, 'Array#lastIndexOf | 1,5,6,8,8,2,5,3 | 3');
  equal([1,5,6,8,8,2,5,3].lastIndexOf(3, 0), -1, 'Array#lastIndexOf | 1,5,6,8,8,2,5,3 | 3 from index 0');
  equal([1,5,6,8,8,2,5,3].lastIndexOf(8), 4, 'Array#lastIndexOf | 1,5,6,8,8,2,5,3 | 8');
  equal([1,5,6,8,8,2,5,3].lastIndexOf(8, 3), 3, 'Array#lastIndexOf | 1,5,6,8,8,2,5,3 | 8 from index 3');
  equal([1,5,6,8,8,2,5,3].lastIndexOf(1), 0, 'Array#lastIndexOf | 1,5,6,8,8,2,5,3 | 1');
  equal([1,5,6,8,8,2,5,3].lastIndexOf(42), -1, 'Array#lastIndexOf | 1,5,6,8,8,2,5,3 | 42');

  equal([2,5,9,2].lastIndexOf(2), 3, 'Array#lastIndexOf | 2,5,9,2 | 2');
  equal([2,5,9,2].lastIndexOf(7), -1, 'Array#lastIndexOf | 2,5,9,2 | 7');
  equal([2,5,9,2].lastIndexOf(2, 3), 3, 'Array#lastIndexOf | 2,5,9,2 | 2 from index 3');
  equal([2,5,9,2].lastIndexOf(2, 2), 0, 'Array#lastIndexOf | 2,5,9,2 | 2 from index 2');
  equal([2,5,9,2].lastIndexOf(2, -2), 0, 'Array#lastIndexOf | 2,5,9,2 | 2 from index -2');
  equal([2,5,9,2].lastIndexOf(2, -1), 3, 'Array#lastIndexOf | 2,5,9,2 | 2 from index -1');
  equal([2,5,9,2].lastIndexOf(2, -10), -1, 'Array#lastIndexOf | 2,5,9,2 | 2 from index -10');

  // Prototype's "lastIndexOf" apparently doesn't pass this particular test.
  //equal([2,5,9,2].lastIndexOf(2, 10), 3, 'Array#lastIndexOf | 2,5,9,2 | 2 from index 10', { prototype: (jQuery.browser.msie ? 10 : 3) });

  equal([{ foo: 'bar' }].lastIndexOf({ foo: 'bar' }), -1, 'Array#lastIndexOf | will not find deep objects (use find)');
  equal([{ foo: 'bar' }].lastIndexOf(function(a) { return a.foo === 'bar'; }), -1, 'Array#lastIndexOf | will not run against a function (use find)');



  equal([1,1,1].every(1), true, 'Array#every | accepts a number shortcut match');
  equal([1,1,2].every(1), false, 'Array#every | accepts a number shortcut no match');
  equal(['a','a','a'].every('a'), true, 'Array#every | accepts a string shortcut match');
  equal(['a','b','a'].every('a'), false, 'Array#every | accepts a string shortcut no match');
  equal(['a','b','c'].every(/[a-f]/), true, 'Array#every | accepts a regex shortcut match');
  equal(['a','b','c'].every(/[m-z]/), false, 'Array#every | accepts a regex shortcut no match');
  equal([{a:1},{a:1}].every({a:1}), true, 'Array#every | checks objects match');
  equal([{a:1},{a:2}].every({a:1}), false, 'Array#every | checks object no match');

  equal([12,5,8,130,44].every(function(el, i, a) { return el >= 10; }), false, 'Array#every | not every element is greater than 10');
  equal([12,54,18,130,44].every(function(el, i, a) { return el >= 10; }), true, 'Array#every | every element is greater than 10');

  equal(arrayOfUndefined.every(undefined), true, 'Array#every | all undefined');
  equal(arrayOfUndefined.clone().add('a').every(undefined), false, 'Array#every | every undefined');
  equal(['a', 'b'].every(undefined), false, 'Array#every | none undefined');

  ['a'].every(function(el, i, a) {
    equal(el, 'a', 'Array#every | First parameter is the element');
    equal(i, 0, 'Array#every | Second parameter is the index');
    equal(a, ['a'], 'Array#every | Third parameter is the array', { prototype: undefined });
    equal(this, 'this', 'Array#every | Scope is passed properly');
  }, 'this');


  equal([{name:'john',age:25}].all({name:'john',age:25}), true, 'Array#all | handles complex objects', { prototype: false });
  equal([{name:'john',age:25},{name:'fred',age:85}].all('age'), false, 'Array#all | simple string mistakenly passed for complex objects');
  equal([{name:'john',age:25},{name:'fred',age:85}].all({name:'john',age:25}), false, "Array#all | john isn't all");



  equal([1,2,3].some(1), true, 'Array#some | accepts a number shortcut match');
  equal([2,3,4].some(1), false, 'Array#some | accepts a number shortcut no match');
  equal(['a','b','c'].some('a'), true, 'Array#some | accepts a string shortcut match');
  equal(['b','c','d'].some('a'), false, 'Array#some | accepts a string shortcut no match');
  equal(['a','b','c'].some(/[a-f]/), true, 'Array#some | accepts a regex shortcut match');
  equal(['a','b','c'].some(/[m-z]/), false, 'Array#some | accepts a regex shortcut no match');
  equal([{a:1},{a:2}].some({a:1}), true, 'Array#some | checks objects match');
  equal([{a:2},{a:3}].some({a:1}), false, 'Array#some | checks object no match');

  equal([12,5,8,130,44].some(function(el, i, a) { return el > 10 }), true, 'Array#some | some elements are greater than 10');
  equal([12,5,8,130,44].some(function(el, i, a) { return el < 10 }), true, 'Array#some | some elements are less than 10');
  equal([12,54,18,130,44].some(function(el, i, a) { return el >= 10 }), true, 'Array#some | all elements are greater than 10');
  equal([12,5,8,130,44].some(function(el, i, a) { return el < 4 }), false, 'Array#some | no elements are less than 4');


  equal(arrayOfUndefined.some(undefined), true, 'Array#some | all undefined');
  equal(arrayOfUndefined.clone().add('a').some(undefined), true, 'Array#some | some undefined');
  equal(['a', 'b'].some(undefined), false, 'Array#some | none undefined');



  equal([].some(function(el, i, a) { return el > 10 }), false, 'Array#some | no elements are greater than 10 in an empty array');
  ['a'].some(function(el, i, a) {
    equal(el, 'a', 'Array#some | first parameter is the element');
    equal(i, 0, 'Array#some | second parameter is the index');
    equal(a, ['a'], 'Array#some | third parameter is the array', { prototype: undefined });
    equal(this, 'this', 'Array#some | scope is passed properly');
  }, 'this');

  equal([{name:'john',age:25}].some({name:'john',age:25}), true, 'Array#every | handles complex objects');
  equal([{name:'john',age:25},{name:'fred',age:85}].some('age'), false, 'Array#some | simple string mistakenly passed for complex objects');
  equal([{name:'john',age:25},{name:'fred',age:85}].some({name:'john',age:25}), true, 'Array#some | john can be found ');




  equal([1,2,3].filter(1), [1], 'Array#filter | accepts a number shortcut match');
  equal([2,3,4].filter(1), [], 'Array#filter | accepts a number shortcut no match');
  equal(['a','b','c'].filter('a'), ['a'], 'Array#filter | accepts a string shortcut match');
  equal(['b','c','d'].filter('a'), [], 'Array#filter | accepts a string shortcut no match');
  equal(['a','b','c'].filter(/[a-f]/), ['a','b','c'], 'Array#filter | accepts a regex shortcut match');
  equal(['a','b','c'].filter(/[m-z]/), [], 'Array#filter | accepts a regex shortcut no match');
  equal([{a:1},{a:2}].filter({a:1}), [{a:1}], 'Array#filter | checks objects match');
  equal([{a:2},{a:3}].filter({a:1}), [], 'Array#filter | checks object no match');

  equal([12,4,8,130,44].filter(function(el, i, a) { return el > 10 }), [12,130,44], 'Array#filter | numbers above 10');
  equal([12,4,8,130,44].filter(function(el, i, a) { return el < 10 }), [4,8], 'Array#filter | numbers below 10');
  ['a'].filter(function(el, i, a) {
    equal(el, 'a', 'Array#filter | first parameter is the element');
    equal(i, 0, 'Array#filter | second parameter is the index');
    equal(a, ['a'], 'Array#filter | third parameter is the array', { prototype: undefined });
    equal(this, 'this', 'Array#filter | scope is passed properly');
  }, 'this');


  equal([{name:'john',age:25},{name:'fred',age:85}].filter('age'), [], 'Array#filter | simple string mistakenly passed for complex objects');
  equal([{name:'john',age:25},{name:'fred',age:85}].filter({name:'john',age:25}), [{name:'john',age:25}], 'Array#filter | filtering john');
  equal([{name:'john',age:25},{name:'fred',age:85}].filter({name:'fred',age:85}), [{name:'fred',age:85}], 'Array#filter | filtering fred');


  arr = [2, 5, 9];
  arr.forEach(function(el, i, a) {
    equal(el, a[i], 'Array#forEach | looping successfully');
  });

  arr = ['a', [1], { foo: 'bar' }, 352];
  count = 0;
  arr.forEach(function(el, i, a) {
      count++;
  });
  equal(count, 4, 'Array#forEach | complex array | should have looped 4 times');

  ['a'].forEach(function(el, i, a) {
    equal(el, 'a', 'Array#forEach | first parameter is the element');
    equal(i, 0, 'Array#forEach | second parameter is the index');
    equal(this, 'this', 'Array#forEach | scope is passed properly');
  }, 'this');




  // Array#each now splits functionality from forEach

  arr = [2, 5, 9];
  arr.each(function(el, i, a) {
    equal(el, arr[i], 'Array#each | looping successfully');
  });

  arr = ['a', [1], { foo: 'bar' }, 352];
  count = 0;
  arr.each(function() {
      count++;
  });
  equal(count, 4, 'Array#each | complex array | should have looped 4 times');

  ['a'].each(function(el, i, a) {
    equal(el, 'a', 'Array#each | first parameter is the element');
    equal(i, 0, 'Array#each | second parameter is the index');
    equal(a, ['a'], 'Array#each | third parameter is the array', { prototype: undefined });
    equal(this, a, 'Array#each | scope is also the array', { prototype: 'this', mootools: 'this' });
  }, 'this');



  equal(['foot','goose','moose'].map(function(el) { return el.replace(/o/g, 'e'); }), ['feet', 'geese', 'meese'], 'Array#map | with regexp');
  // cool!
  equal([1,4,9].map(Math.sqrt), [1,2,3], 'Array#map | passing Math.sqrt directly');
  equal([{ foo: 'bar' }].map(function(el) { return el['foo']; }), ['bar'], 'Array#map | with key "foo"');

  ['a'].map(function(el, i, a) {
    equal(el, 'a', 'Array#map | first parameter is the element');
    equal(i, 0, 'Array#map | second parameter is the index');
    equal(a, ['a'], 'Array#map | third parameter is the array', { prototype: undefined });
    equal(this, 'this', 'Array#map | scope is passed properly');
  }, 'this');


  equal(['foot','goose','moose'].map('length'), [4,5,5], 'Array#map | length');
  equal([{name:'john',age:25},{name:'fred',age:85}].map('age'), [25,85], 'Array#map | age');
  equal([{name:'john',age:25},{name:'fred',age:85}].map('name'), ['john','fred'], 'Array#map | name');
  equal([{name:'john',age:25},{name:'fred',age:85}].map('cupsize'), [undefined, undefined], 'Array#map | (nonexistent) cupsize');
  equal([].map('name'), [], 'Array#map');

  equal([1,2,3].map('toString'), ['1','2','3'], 'Array#map | calls a function on a shortcut string');

  raisesError(function(){ [1,2,3].map() }, 'Array#map | raises an error if no argument', { prototype: false });
  raisesError(function(){ [1,2,3].map(undefined) }, 'Array#map | raises an error on undefined');
  raisesError(function(){ [1,2,3].map(null) }, 'Array#map | raises an error on null');
  raisesError(function(){ [1,2,3].map(3) }, 'Array#map | raises an error on a number');



  equal([0,1,2,3,4].reduce(function(a,b) { return a + b; }), 10, 'Array#reduce | a + b');
  equal([[0,1],[2,3],[4,5]].reduce(function(a,b) { return a.concat(b); }, []), [0,1,2,3,4,5], 'Array#reduce | concat');
  ['a'].reduce(function(p, c, i, a) {
    equal(p, 'c', 'Array#reduce | a | first parameter is the lhs');
    equal(c, 'a', 'Array#reduce | a | second parameter is the rhs');
    equal(i, 0, 'Array#reduce | a | third parameter is the index');
    equal(a, ['a'], 'Array#reduce | a | fourth parameter is the array');
  }, 'c');
  [55,66].reduce(function(p, c, i, a) {
    equal(p, 55, 'Array#reduce | 55,66 | first parameter is the lhs');
    equal(c, 66, 'Array#reduce | 55,66 | second parameter is the rhs');
    equal(i, 1, 'Array#reduce | 55,66 | third parameter is the index');
    equal(a, [55,66], 'Array#reduce | 55,66 | fourth parameter is the array');
  });
  [1].reduce(function(p, c, i, a) {
    // This assertion should never be called.
    equal(true, false, 'Array#reduce | one element array with no rhs passed in does not iterate');
  });
  equal([1].reduce(function() {}), 1, 'Array#reduce | [1] reduces to 1');


  equal([0,1,2,3,4].reduceRight(function(a,b) { return a + b; }), 10, 'Array#reduceRight | a + b');
  equal([[0,1],[2,3],[4,5]].reduceRight(function(a,b) { return a.concat(b); }, []), [4,5,2,3,0,1], 'Array#reduceRight | concat');
  ['a'].reduceRight(function(p, c, i, a) {
    equal(p, 'c', 'Array#reduceRight | a | first parameter is the lhs');
    equal(c, 'a', 'Array#reduceRight | a | second parameter is the rhs');
    equal(i, 0, 'Array#reduceRight | a | third parameter is the index');
    equal(a, ['a'], 'Array#reduceRight | a | fourth parameter is the array');
  }, 'c');
  [55,66].reduceRight(function(p, c, i, a) {
    equal(p, 66, 'Array#reduceRight | 55,66 | first parameter is the lhs');
    equal(c, 55, 'Array#reduceRight | 55,66 | second parameter is the rhs');
    equal(i, 0, 'Array#reduceRight | 55,66 | third parameter is the index');
    equal(a, [55,66], 'Array#reduceRight | 55,66 | fourth parameter is the array');
  });
  [1].reduceRight(function(p, c, i, a) {
    // This assertion should never be called.
    equal(true, false, 'Array#reduceRight | one element array with no rhs passed in does not iterate');
  });
  equal([1].reduceRight(function() {}), 1, 'Array#reduceRight | [1] reduces to 1');


  var result = [];
  var count = 0;
  ['a','b','c'].each(function(s, i) {
    result.push(s);
    equal(i, count + 1, 'Array#each | index should be correct', { prototype: count, mootools: count });
    count++;
  }, 1);

  equal(count, 2, 'Array#each | should have run 2 times', { prototype: 3, mootools: 3 });
  equal(result, ['b','c'], 'Array#each | result', { prototype: ['a','b','c'], mootools: ['a','b','c'] });


  result = [];
  indexes = [1,2,0];
  count = 0;
  ['a','b','c'].each(function(s, i) {
    result.push(s);
    equal(i, indexes[count], 'Array#each | looping from index 1 | index should be correct', { prototype: indexes.at(count - 1), mootools: indexes.at(count - 1) })
    count++;
  }, 1, true);

  equal(count, 3, 'Array#each | looping from index 1 | should have run 3 times')
  equal(result, ['b','c','a'], 'Array#each | looping from index 1 | result', { prototype: ['a','b','c'], mootools: ['a','b','c'] });


  result = [];
  indexes = [0,1,2];
  count = 0;
  ['a','b','c'].each(function(s, i) {
    result.push(s);
    equal(i, indexes[count], 'Array#each | looping from index 0 | index should be correct')
    count++;
  }, 0, true);

  equal(count, 3, 'Array#each | looping from index 0 | should have run 3 times')
  equal(result, ['a','b','c'], 'Array#each | looping from index 0 | result');



  result = [];
  indexes = [2,0,1];
  count = 0;
  ['a','b','c'].each(function(s, i) {
    result.push(s);
    equal(i, indexes[count], 'Array#each | looping from index 2 | index should be correct', { prototype: indexes.at(count + 1), mootools: indexes.at(count + 1) })
    count++;
  }, 2, true);

  equal(count, 3, 'Array#each | looping from index 2 | should have run 3 times')
  equal(result, ['c','a','b'], 'Array#each | looping from index 2 | result', { prototype: ['a','b','c'], mootools: ['a','b','c'] });



  result = [];
  count = 0;
  ['a','b','c'].each(function(s, i) {
    result.push(s);
    count++;
  }, 3, true);

  equal(count, 3, 'Array#each | looping from index 3 | should have run 3 times')
  equal(result, ['a','b','c'], 'Array#each | looping from index 3 | result');



  result = [];
  count = 0;
  ['a','b','c'].each(function(s, i) {
    result.push(s);
    count++;
  }, 4, true);

  equal(count, 3, 'Array#each | looping from index 4 | should have run 3 times')
  equal(result, ['b','c','a'], 'Array#each | looping from index 4 | result', { prototype: ['a','b','c'], mootools: ['a','b','c'] });



  result = [];
  count = 0;
  ['a','b','c'].each(function(s, i) {
    result.push(s);
    count++;
  }, 49, true);

  equal(count, 3, 'Array#each | looping from index 49 | should have run 3 times')
  equal(result, ['b','c','a'], 'Array#each | looping from index 49 | result', { prototype: ['a','b','c'], mootools: ['a','b','c'] });



  result = [];
  count = 0;
  ['a','b','c'].each(function(s, i) {
    result.push(s);
    count++;
  }, 'hoofa');

  equal(count, 3, 'Array#each | string index should default to 0 | should have run 3 times')
  equal(result, ['a','b','c'], 'Array#each | string index should default to 0 | result');


  equal(['a','b','c'].each(function(){}), ['a','b','c'], 'Array#each | null function returns the array');
  raisesError(function(){ [1].each() }, 'Array#each | raises an error if no callback');

  count = 0;
  ['a','b','c'].each(function() {
    count++;
    return false;
  });
  equal(count, 1, 'Array#each | returning false will break the loop', { prototype: 3, mootools: 3 });

  count = 0;
  ['a','b','c'].each(function() {
    count++;
    return true;
  });
  equal(count, 3, 'Array#each | returning true will not break the loop');

  count = 0;
  ['a','b','c'].each(function() {
    count++;
    return;
  });
  equal(count, 3, 'Array#each | returning undefined will not break the loop');


  // Sparse array handling with Array#each
  // These tests cannot be run with Prototype/Mootools, as they will lock the browser

  skipEnvironments(['prototype','mootools'], function() {

    arr = ['a'];
    arr[Math.pow(2,32) - 2] = 'b';
    expected = ['a','b'];
    expectedIndexes = [0, Math.pow(2,32) - 2];
    count = 0;
    arr.each(function(el, i, a) {
      strictlyEqual(this, arr, 'Array#each | sparse arrays | this object should be the array');
      strictlyEqual(el, expected[count], 'Array#each | sparse arrays | first argument should be the current element');
      strictlyEqual(i, expectedIndexes[count], 'Array#each | sparse arrays | second argument should be the current index');
      strictlyEqual(a, arr, 'Array#each | sparse arrays | third argument should be the array');
      count++;
    });
    equal(count, 2, 'Array#each | sparse arrays | count should match');


    arr = [];
    arr[-2] = 'd';
    arr[2]  = 'f';
    arr[Math.pow(2,32)] = 'c';
    count = 0;
    arr.each(function(el, i) {
      strictlyEqual(el, 'f', 'Array#each | sparse arrays | values outside range are not iterated over | el');
      strictlyEqual(i, 2, 'Array#each | sparse arrays | values outside range are not iterated over | index');
      count++;
    });
    equal(count, 1, 'Array#each | sparse arrays | values outside range are not iterated over | count');

  });



  arr = [];
  arr[9] = 'd';
  arr[2] = 'f';
  arr[5] = 'c';
  count = 0;
  expected = ['f','c','d'];
  expectedIndexes = [2,5,9];
  arr.each(function(el, i) {
    equal(el, expected[count], 'Array#each | sparse arrays | elements are in expected order');
    // TODO REWORK THIS AS IT SHOULD BE STRICT!!
    equal(i, expectedIndexes[count], 'Array#each | sparse arrays | index is in expected order', { prototype: count });
    count++;
  });
  equal(count, 3, 'Array#each | sparse arrays | unordered array should match');


  count = 0;
  arrayOfUndefined.each(function() {
    count++;
  });
  equal(count, 3, 'Array#each | however, simply having an undefined in an array does not qualify it as sparse');



  equal(['a','b','c'].find('a'), 'a', 'Array#find | a');
  equal(['a','a','c'].find('a'), 'a', 'Array#find | first a');
  equal(['a','b','c'].find('q'), undefined, 'Array#find | q');
  equal([1,2,3].find(1), 1, 'Array#find | 1');
  equal([2,2,3].find(2), 2, 'Array#find | 2');
  equal([1,2,3].find(4), undefined, 'Array#find | 4');
  equal([{a:1},{b:2},{c:3}].find({a:1}), {a:1}, 'Array#find | a:1', { prototype: undefined });
  equal([{a:1},{a:1},{c:3}].find({a:1}), {a:1}, 'Array#find | first a:1', { prototype: undefined });
  equal([{a:1},{b:2},{c:3}].find({d:4}), undefined, 'Array#find | d:4');
  equal([{a:1},{b:2},{c:3}].find({c:4}), undefined, 'Array#find | c:4');
  equal([[1,2],[2,3],[4,5]].find([2,3]), [2,3], 'Array#find | 2,3', { prototype: undefined });
  equal([[1,2],[2,3],[4,5]].find([2,4]), undefined, 'Array#find | 2,4');
  equal([[1,2],[2,3],[2,3]].find([2,3]), [2,3], 'Array#find | first 2,3', { prototype: undefined });
  equal(['foo','bar'].find(/f+/), 'foo', 'Array#find | /f+/', { prototype: undefined });
  equal(['foo','bar'].find(/[a-f]/), 'foo', 'Array#find | /a-f/', { prototype: undefined });
  equal(['foo','bar'].find(/[a-f]/, 1), 'bar', 'Array#find | /a-f/ from index 1', { prototype: undefined });
  equal(['foo','bar'].find(/q+/), undefined, 'Array#find | /q+/');
  equal([1,2,3].find(function(e) { return e > 0; }, 0), 1, 'Array#find | greater than 0 from index 0');
  equal([1,2,3].find(function(e) { return e > 0; }, 1), 2, 'Array#find | greater than 0 from index 1', { prototype: 1 });
  equal([1,2,3].find(function(e) { return e > 0; }, 2), 3, 'Array#find | greater than 0 from index 2', { prototype: 1 });
  equal([1,2,3].find(function(e) { return e > 0; }, 3), undefined, 'Array#find | greater than 0 from index 3', { prototype: 1 });
  equal([1,2,3].find(function(e) { return e > 1; }, 0), 2, 'Array#find | greater than 1 from index 0');
  equal([1,2,3].find(function(e) { return e > 1; }, 1), 2, 'Array#find | greater than 1 from index 1');
  equal([1,2,3].find(function(e) { return e > 1; }, 2), 3, 'Array#find | greater than 1 from index 2', { prototype: 2 });
  equal([1,2,3].find(function(e) { return e > 2; }, 0), 3, 'Array#find | greater than 2 from index 0');
  equal([1,2,3].find(function(e) { return e > 3; }, 0), undefined, 'Array#find | greater than 3 from index 0');

  equal([{a:10},{a:8},{a:3}].find(function(e) { return e['a'] > 5; }, 0), {a:10}, 'Array#find | key "a" greater than 5');
  equal([{a:10},{a:8},{a:3}].find(function(e) { return e['a'] > 5; }, 1), {a:8}, 'Array#find | key "a" greater than 5 from index 1', { prototype: {a:10} });
  equal([{a:10},{a:8},{a:3}].find(function(e) { return e['a'] > 5; }, 2), undefined, 'Array#find | key "a" greater than 5 from index 2', { prototype: {a:10} });
  equal([function() {}].find(function(e) {}, 0), undefined, 'Array#find | undefined function');
  equal([function() {}].find(function(e) {}, 1), undefined, 'Array#find | null function from index 1');
  equal([null, null].find(null, 0), null, 'Array#find | null');
  equal([null, null].find(null, 1), null, 'Array#find | null from index 1');
  equal([undefined, undefined].find(undefined, 0), undefined, 'Array#find | undefined');
  equal([undefined, undefined].find(undefined, 1), undefined, 'Array#find | undefined from index 1');
  equal([undefined, 'a'].find(undefined, 1), undefined, 'Array#find | undefined can be found');


  count = 0;
  [1,2,3].find(function(n) {
    count++;
    return n == 1;
  });
  equal(count, 1, 'Array#find | should immediately finish when it finds a match');





  equal(['a','b','c'].findAll('a'), ['a'], 'Array#findAll | a');
  equal(['a','a','c'].findAll('a'), ['a','a'], 'Array#findAll | a,a');
  equal(['a','b','c'].findAll('q'), [], 'Array#findAll | q');
  equal([1,2,3].findAll(1), [1], 'Array#findAll | 1');
  equal([2,2,3].findAll(2), [2,2], 'Array#findAll | 2,2');
  equal([1,2,3].findAll(4), [], 'Array#findAll | 4');
  equal([{a:1},{b:2},{c:3}].findAll({a:1}), [{a:1}], 'Array#findAll | a:1', { prototype: [] });
  equal([{a:1},{a:1},{c:3}].findAll({a:1}), [{a:1},{a:1}], 'Array#findAll | a:1,a:1', { prototype: [] });
  equal([{a:1},{b:2},{c:3}].findAll({d:4}), [], 'Array#findAll | d:4');
  equal([{a:1},{b:2},{c:3}].findAll({c:4}), [], 'Array#findAll | c:4');
  equal([[1,2],[2,3],[4,5]].findAll([2,3]), [[2,3]], 'Array#findAll | 2,3', { prototype: [] });
  equal([[1,2],[2,3],[4,5]].findAll([2,4]), [], 'Array#findAll | 2,4');
  equal([[1,2],[2,3],[2,3]].findAll([2,3]), [[2,3],[2,3]], 'Array#findAll | [2,3],[2,3]', { prototype: [] });
  equal(['foo','bar'].findAll(/f+/), ['foo'], 'Array#findAll | /f+/', { prototype: [] });
  equal(['foo','bar'].findAll(/[a-f]/), ['foo','bar'], 'Array#findAll | /[a-f]/', { prototype: [] });
  equal(['foo','bar'].findAll(/[a-f]/, 1), ['bar'], 'Array#findAll | /[a-f]/ from index 1', { prototype: [] });
  equal(['foo','bar'].findAll(/[a-f]/, 1, true), ['bar','foo'], 'Array#findAll | /[a-f]/ from index 1', { prototype: [] });
  equal(['foo','bar'].findAll( /q+/), [], 'Array#findAll | /q+/');
  equal([1,2,3].findAll(function(e) { return e > 0; }, 0), [1,2,3], 'Array#findAll | greater than 0 from index 0');
  equal([1,2,3].findAll(function(e) { return e > 0; }, 1), [2,3], 'Array#findAll | greater than 0 from index 1', { prototype: [1,2,3] });
  equal([1,2,3].findAll(function(e) { return e > 0; }, 2), [3], 'Array#findAll | greater than 0 from index 2', { prototype: [1,2,3] });
  equal([1,2,3].findAll(function(e) { return e > 0; }, 3), [], 'Array#findAll | greater than 0 from index 3', { prototype: [1,2,3] });
  equal([1,2,3].findAll(function(e) { return e > 0; }, 4), [], 'Array#findAll | greater than 0 from index 4', { prototype: [1,2,3] });
  equal([1,2,3].findAll(function(e) { return e > 1; }, 0), [2,3], 'Array#findAll | greater than 1 from index 0');
  equal([1,2,3].findAll(function(e) { return e > 1; }, 1), [2,3], 'Array#findAll | greater than 1 from index 1');
  equal([1,2,3].findAll(function(e) { return e > 1; }, 2), [3], 'Array#findAll | greater than 1 from index 2', { prototype: [2,3] });
  equal([1,2,3].findAll(function(e) { return e > 2; }, 0), [3], 'Array#findAll | greater than 2 from index 0');
  equal([1,2,3].findAll(function(e) { return e > 3; }, 0), [], 'Array#findAll | greater than 3 from index 0');

  equal([1,2,3].findAll(function(e) { return e > 0; }, 0, true), [1,2,3], 'Array#findAll | looping | greater than 0 from index 0');
  equal([1,2,3].findAll(function(e) { return e > 0; }, 1, true), [2,3,1], 'Array#findAll | looping | greater than 0 from index 1', { prototype: [1,2,3] });
  equal([1,2,3].findAll(function(e) { return e > 0; }, 2, true), [3,1,2], 'Array#findAll | looping | greater than 0 from index 2', { prototype: [1,2,3] });
  equal([1,2,3].findAll(function(e) { return e > 0; }, 3, true), [1,2,3], 'Array#findAll | looping | greater than 0 from index 3', { prototype: [1,2,3] });
  equal([1,2,3].findAll(function(e) { return e > 1; }, 0, true), [2,3], 'Array#findAll | looping | greater than 1 from index 0');
  equal([1,2,3].findAll(function(e) { return e > 1; }, 1, true), [2,3], 'Array#findAll | looping | greater than 1 from index 1', { prototype: [2,3] });
  equal([1,2,3].findAll(function(e) { return e > 1; }, 2, true), [3,2], 'Array#findAll | looping | greater than 1 from index 2', { prototype: [2,3] });
  equal([1,2,3].findAll(function(e) { return e > 2; }, 0, true), [3], 'Array#findAll | looping | greater than 2 from index 0');
  equal([1,2,3].findAll(function(e) { return e > 3; }, 0, true), [], 'Array#findAll | looping | greater than 3 from index 0');

  equal([{a:10},{a:8},{a:3}].findAll(function(e) { return e['a'] > 5; }, 0), [{a:10},{a:8}], 'Array#findAll | key "a" is greater than 5');
  equal([{a:10},{a:8},{a:3}].findAll(function(e) { return e['a'] > 5; }, 1), [{a:8}], 'Array#findAll | key "a" is greater than 5 from index 1', { prototype: [{a:10},{a:8}] });
  equal([{a:10},{a:8},{a:3}].findAll(function(e) { return e['a'] > 5; }, 2), [], 'Array#findAll | key "a" is greater than 5 from index 2', { prototype: [{a:10},{a:8}] });

  equal([{a:10},{a:8},{a:3}].findAll(function(e) { return e['a'] > 5; }, 0, true), [{a:10},{a:8}], 'Array#findAll | looping | key "a" is greater than 5');
  equal([{a:10},{a:8},{a:3}].findAll(function(e) { return e['a'] > 5; }, 1, true), [{a:8},{a:10}], 'Array#findAll | looping | key "a" is greater than 5 from index 1', { prototype: [{a:10},{a:8}] });
  equal([{a:10},{a:8},{a:3}].findAll(function(e) { return e['a'] > 5; }, 2, true), [{a:10},{a:8}], 'Array#findAll | looping | key "a" is greater than 5 from index 2', { prototype: [{a:10},{a:8}] });

  equal([function() {}].findAll(function(e) {}, 0), [], 'Array#findAll | null function');
  equal([function() {}].findAll(function(e) {}, 1), [], 'Array#findAll | null function from index 1');
  equal([null, null].findAll(null, 0), [null, null], 'Array#findAll | null');
  equal([null, null].findAll(null, 1), [null], 'Array#findAll | null from index 1', { prototype: [null,null] });

  equal([function() {}].findAll(function(e) {}, 0, true), [], 'Array#findAll | looping | null function');
  equal([function() {}].findAll(function(e) {}, 1, true), [], 'Array#findAll | looping | null function from index 1');
  equal([null, null].findAll(null, 0, true), [null, null], 'Array#findAll | looping | null');
  equal([null, null].findAll(null, 1, true), [null, null], 'Array#findAll | looping | null from index 1');




  // Example: finding last from an index. (reverse order). This means we don't need a findAllFromLastIndex
  arr = [{name:'john',age:10,food:'sushi'},{name:'randy',age:23,food:'natto'},{name:'karen',age:32,food:'salad'}];
  arr = [1,2,3,4,5,6,7,8,9];
  equal(arr.findAll(function(n) { return n % 3 == 0; }, 4), [6,9], 'Array#findAll | n % 3 from index 4', { prototype: [3,6,9] });
  equal(arr.reverse().findAll(function(n) { return n % 3 == 0; }, 4), [3], 'Array#findAll | reversed | n % 3 from index 4 reversed', { prototype: [9,6,3] });

  arr.reverse(); // Array#reverse is destructive, dammit!
  equal(arr.findAll(function(n) { return n % 3 == 0; }, 4, true), [6,9,3], 'Array#findAll | looping | n % 3 from index 4', { prototype: [3,6,9] });
  equal(arr.reverse().findAll(function(n) { return n % 3 == 0; }, 4, true), [3,9,6], 'Array#findAll | looping | reversed | n % 3 from index 4 reversed', { prototype: [9,6,3] });


  equal([1,1,3].unique(), [1,3], 'Array#unique | 1,1,3');
  equal([0,0,0].unique(), [0], 'Array#unique | 0,0,0');
  equal(['a','b','c'].unique(), ['a','b','c'], 'Array#unique | a,b,c');
  equal(['a','a','c'].unique(), ['a','c'], 'Array#unique | a,a,c');


  equal([{foo:'bar'}, {foo:'bar'}].unique(), [{foo:'bar'}], 'Array#unique | objects uniqued as well');




  equal([1,2,3].union([3,4,5]), [1,2,3,4,5], 'Array#union | 1,2,3 + 3,4,5');
  equal([1,1,1].union([1,2,3]), [1,2,3], 'Array#union | 1,1,1 + 1,2,3');
  equal([0,0,0].union([1,2,3]), [0,1,2,3], 'Array#union | 0,0,0 + 1,2,3');
  equal([0,0,0].union([0,0,0]), [0], 'Array#union | 0,0,0 + 0,0,0');
  equal([].union([]), [], 'Array#union | 2 empty arrays');
  equal([-1,-2,-3].union([-2,-4,-5]), [-1,-2,-3,-4,-5], 'Array#union | -1,-2,-3 + -2,-4,-5');
  equal([-1,-2,-3].union([3,4,5]), [-1,-2,-3,3,4,5], 'Array#union | -1,-2,-3 + 3,4,5');
  equal([{a:1},{b:2}].union([{b:2},{c:3}]), [{a:1},{b:2},{c:3}], 'Array#intersect | a:1,b:2 + b:2,c:3');
  equal([1,2,3].union(4), [1,2,3,4], 'Array#union | 1,2,3 + 4');

  equal([1,2,3].union(4,8,10), [1,2,3,4,8,10], 'Array#union | 1,2,3 + 4 8 10');
  equal([1,2,3].union([4],[8],[10]), [1,2,3,4,8,10], 'Array#union | 1,2,3 + [4] [8] [10]');

  arr = [1,2,3];
  arr.union([4,5,6]);
  equal(arr, [1,2,3], 'Array#union | is non-destructive');



  equal([1,2,3].intersect([3,4,5]), [3], 'Array#intersect | 1,2,3 + 3,4,5');
  equal(['a','b','c'].intersect(['c','d','e']), ['c'], 'Array#intersect | a,b,c + c,d,e');
  equal([1,2,3].intersect([1,2,3]), [1,2,3], 'Array#intersect | 1,2,3 + 1,2,3');
  equal([1,2,3].intersect([3,2,1]), [1,2,3], 'Array#intersect | 1,2,3 + 3,2,1');
  equal([].intersect([3]), [], 'Array#intersect | empty array + 3');
  equal([3].intersect([]), [], 'Array#intersect | 3 + empty array');
  equal([].intersect([]), [], 'Array#intersect | 2 empty arrays');
  equal([null].intersect([]), [], 'Array#intersect | [null] + empty array');
  equal([null].intersect([null]), [null], 'Array#intersect | [null] + [null]', { prototype: [] });
  equal([false].intersect([false]), [false], 'Array#intersect | [false] + [false]', { prototype: [] });
  equal([false].intersect([0]), [], 'Array#intersect | [false] + [0]');
  equal([false].intersect([null]), [], 'Array#intersect | [false] + [null]');
  equal([false].intersect([undefined]), [], 'Array#intersect | [false] + [undefined]');
  equal([{a:1},{b:2}].intersect([{b:2},{c:3}]), [{b:2}], 'Array#intersect | a:1,b:2 + b:2,c:3', { prototype: [] });
  equal([1,1,3].intersect([1,5,6]), [1], 'Array#intersect | 1,1,3 + 1,5,6');
  equal([1,2,3].intersect([4,5,6]), [], 'Array#intersect | 1,1,3 + 4,5,6');

  equal([1,2,3].intersect([3,4,5],[0,1]), [1,3], 'Array#intersect | handles multiple arguments');
  equal([1,1].intersect(1,1,[1,1]), [1], 'Array#intersect | assure uniqueness');

  arr = [1,2,3];
  arr.intersect([3,4,5]);
  equal(arr, [1,2,3], 'Array#intersect | is non-destructive');


  // Prototype will blow up here
  skipEnvironments(['prototype'], function(){
    equal([1,2,3].intersect(1), [1], 'Array#intersect | 1,2,3 + 1');
  });




  equal([1,2,3].subtract([3,4,5]), [1,2], 'Array#subtract | 1,2,3 + 3,4,5');
  equal([1,1,2,2,3,3,4,4,5,5].subtract([2,3,4]), [1,1,5,5], 'Array#subtract | 1,1,2,2,3,3,4,4,5,5 + 2,3,4');
  equal(['a','b','c'].subtract(['c','d','e']), ['a','b'], 'Array#subtract | a,b,c + c,d,e');
  equal([1,2,3].subtract([1,2,3]), [], 'Array#subtract | 1,2,3 + 1,2,3');
  equal([1,2,3].subtract([3,2,1]), [], 'Array#subtract | 1,2,3 + 3,2,1');
  equal([].subtract([3]), [], 'Array#subtract | empty array + [3]');
  equal([3].subtract([]), [3], 'Array#subtract | [3] + empty array');
  equal([].subtract([]), [], 'Array#subtract | 2 empty arrays');
  equal([null].subtract([]), [null], 'Array#subtract | [null] + empty array');
  equal([null].subtract([null]), [], 'Array#subtract | [null] + [null]');
  equal([false].subtract([false]), [], 'Array#subtract | [false] + [false]');
  equal([false].subtract([0]), [false], 'Array#subtract | [false] + [0]');
  equal([false].subtract([null]), [false], 'Array#subtract | [false] + [null]');
  equal([false].subtract([undefined]), [false], 'Array#subtract | [false] + [undefined]');
  equal([{a:1},{b:2}].subtract([{b:2},{c:3}]), [{a:1}], 'Array#subtract | a:1,b:2 + b:2,c:3');
  equal([1,1,3].subtract([1,5,6]), [3], 'Array#subtract | 1,1,3 + 1,5,6');
  equal([1,2,3].subtract([4,5,6]), [1,2,3], 'Array#subtract | 1,2,3 + 4,5,6');
  equal([1,2,3].subtract(1), [2,3], 'Array#subtract | 1,2,3 + 1');

  equal([1,2,3,4,5].subtract([1],[3],[5]), [2,4], 'Array#subtract | handles multiple arguments');

  arr = [1,2,3];
  arr.subtract([3]);
  equal(arr, [1,2,3], 'Array#subtract | is non-destructive');





  equal(['a','b','c'].at(0), 'a', 'Array#at | a,b,c | 0');
  equal(['a','b','c'].at(1), 'b', 'Array#at | a,b,c | 1');
  equal(['a','b','c'].at(2), 'c', 'Array#at | a,b,c | 2');
  equal(['a','b','c'].at(3), 'a', 'Array#at | a,b,c | 3');
  equal(['a','b','c'].at(-1), 'c', 'Array#at | a,b,c | -1');
  equal(['a','b','c'].at(-2), 'b', 'Array#at | a,b,c | -2');
  equal(['a','b','c'].at(-3), 'a', 'Array#at | a,b,c | -3');
  equal(['a','b','c'].at(-4), 'c', 'Array#at | a,b,c | -3');

  equal(['a','b','c'].at(0, false), 'a', 'Array#at | a,b,c | 0');
  equal(['a','b','c'].at(1, false), 'b', 'Array#at | a,b,c | 1');
  equal(['a','b','c'].at(2, false), 'c', 'Array#at | a,b,c | 2');
  equal(['a','b','c'].at(3, false), null, 'Array#at | a,b,c | 3');
  equal(['a','b','c'].at(-1, false), null, 'Array#at | a,b,c | -1');
  equal(['a','b','c'].at(-2, false), null, 'Array#at | a,b,c | -2');
  equal(['a','b','c'].at(-3, false), null, 'Array#at | a,b,c | -3');
  equal(['a','b','c'].at(-4, false), null, 'Array#at | a,b,c | -4');
  equal(['a','b','c'].at(), null, 'Array#at | a,b,c | no argument');
  equal([false].at(0), false, 'Array#at | false | 0');
  equal(['a'].at(0), 'a', 'Array#at | a | 0');
  equal(['a'].at(1), 'a', 'Array#at | a | 1');
  equal(['a'].at(1, false), null, 'Array#at | a | 1');
  equal(['a'].at(-1), 'a', 'Array#at | a | -1');
  equal(['a','b','c','d','e','f'].at(0,2,4), ['a','c','e'], 'Array#at | a,b,c,d,e,f | 0,2,4');
  equal(['a','b','c','d','e','f'].at(1,3,5), ['b','d','f'], 'Array#at | a,b,c,d,e,f | 1,3,5');
  equal(['a','b','c','d','e','f'].at(0,2,4,6), ['a','c','e','a'], 'Array#at | a,b,c,d,e,f | 0,2,4,6');
  equal(['a','b','c','d','e','f'].at(0,2,4,6, false), ['a','c','e'], 'Array#at | a,b,c,d,e,f | 0,2,4,6 | false');



  equal(['a','b','c'].from(), ['a','b','c'], 'Array#from | no argument');
  equal(['a','b','c'].from(1), ['b','c'], 'Array#from| 1');
  equal(['a','b','c'].from(2), ['c'], 'Array#from | 2');
  equal(['a','b','c'].from(3), [], 'Array#from | 3');
  equal(['a','b','c'].from(4), [], 'Array#from | 4');
  equal(['a','b','c'].from(-1), ['c'], 'Array#from | -1');
  equal(['a','b','c'].from(-2), ['b','c'], 'Array#from | -2');
  equal(['a','b','c'].from(-3), ['a','b','c'], 'Array#from | -3');
  equal(['a','b','c'].from(-4), ['a','b','c'], 'Array#from | -4');


  equal(['a','b','c'].to(), ['a','b','c'], 'Array#to | no argument');
  equal(['a','b','c'].to(0), [], 'Array#to | no argument');
  equal(['a','b','c'].to(1), ['a'], 'Array#to | 1');
  equal(['a','b','c'].to(2), ['a','b'], 'Array#to | 2');
  equal(['a','b','c'].to(3), ['a','b','c'], 'Array#to | 3');
  equal(['a','b','c'].to(4), ['a','b','c'], 'Array#to | 4');
  equal(['a','b','c'].to(-1), ['a','b'], 'Array#to | -1');
  equal(['a','b','c'].to(-2), ['a'], 'Array#to | -2');
  equal(['a','b','c'].to(-3), [], 'Array#to | -3');
  equal(['a','b','c'].to(-4), [], 'Array#to | -4');



  equal(['a','b','c'].first(), 'a', 'Array#first | no argument');
  equal(['a','b','c'].first(1), ['a'], 'Array#first | 1', { prototype: 'a' });
  equal(['a','b','c'].first(2), ['a','b'], 'Array#first | 2', { prototype: 'a' });
  equal(['a','b','c'].first(3), ['a','b','c'], 'Array#first | 3', { prototype: 'a' });
  equal(['a','b','c'].first(4), ['a','b','c'], 'Array#first | 4', { prototype: 'a' });
  equal(['a','b','c'].first(-1), [], 'Array#first | -1', { prototype: 'a' });
  equal(['a','b','c'].first(-2), [], 'Array#first | -2', { prototype: 'a' });
  equal(['a','b','c'].first(-3), [], 'Array#first | -3', { prototype: 'a' });


  equal(['a','b','c'].last(), 'c', 'Array#last | no argument');
  equal(['a','b','c'].last(1), ['c'], 'Array#last | 1', { prototype: 'c' });
  equal(['a','b','c'].last(2), ['b','c'], 'Array#last | 2', { prototype: 'c' });
  equal(['a','b','c'].last(3), ['a','b','c'], 'Array#last | 3', { prototype: 'c' });
  equal(['a','b','c'].last(4), ['a','b','c'], 'Array#last | 4', { prototype: 'c' });
  equal(['a','b','c'].last(-1), [], 'Array#last | -1', { prototype: 'c' });
  equal(['a','b','c'].last(-2), [], 'Array#last | -2', { prototype: 'c' });
  equal(['a','b','c'].last(-3), [], 'Array#last | -3', { prototype: 'c' });
  equal(['a','b','c'].last(-4), [], 'Array#last | -4', { prototype: 'c' });





  raisesError(function() { [1,2,3].min(undefined); }, 'Array#min | raises an error on undefined', { prototype: false });
  raisesError(function() { [1,2,3].min(null); }, 'Array#min | raises an error on null', { prototype: false });
  raisesError(function() { [1,2,3].min(4); }, 'Array#min | raises an error on number', { prototype: false });

  equal([12,87,55].min(), [12], 'Array#min | 12', { prototype: 12 });
  equal([-12,-87,-55].min(), [-87], 'Array#min | -87', { prototype: -87 });
  equal([5,5,5].min(), [5], 'Array#min | 5 is uniqued', { prototype: 5 });
  equal(['a','b','c'].min(), [], 'Array#min | strings are not counted', { prototype: 'a' });
  equal([].min(), [], 'Array#min | empty array', { prototype: undefined });
  equal([null].min(), [], 'Array#min | [null]', { prototype: null });
  equal([undefined].min(), [], 'Array#min | [undefined]', { prototype: undefined });
  equal([{a:1,b:5},{a:2,b:5},{a:3,b:5}].min(function(el) { return el['a']; }), [{a:1,b:5}], 'Array#min | key "a"', { prototype: 1 });
  equal([{a:1,b:5},{a:2,b:4},{a:3,b:3}].min(function(el) { return el['b']; }), [{a:3,b:3}], 'Array#min | key "b", 1 found', { prototype: 3 });
  equal([{a:1,b:5},{a:3,b:3},{a:3,b:3}].min(function(el) { return el['b']; }), [{a:3,b:3}], 'Array#min | key "b", 1 found', { prototype: 3 });
  equal([{a:1,b:3},{a:2,b:4},{a:3,b:3}].min(function(el) { return el['b']; }), [{a:1,b:3},{a:3,b:3}], 'Array#min | key "b", 2 found', { prototype: 3 });
  equal([{a:-1,b:-5},{a:-2,b:-4},{a:-3,b:-3}].min(function(el) { return el['b']; }), [{a:-1,b:-5}], 'Array#min | key "b", 1 found', { prototype: -5 });
  equal(['short','and','mort'].min(function(el) { return el.length; }), ['and'], 'Array#min | length', { prototype: 3 });
  equal(['short','and','mort','fat'].min(function(el) { return el.length; }), ['and','fat'], 'Array#min | and,fat', { prototype: 3 });
  equal(['short','and','mort'].min('length'), ['and'], 'Array#min | length with shortcut', { prototype: 3 });




  raisesError(function() { [1,2,3].max(undefined); }, 'Array#max | raises an error on undefined', { prototype: false });
  raisesError(function() { [1,2,3].max(null); }, 'Array#max | raises an error on null', { prototype: false });
  raisesError(function() { [1,2,3].max(4); }, 'Array#max | raises an error on number', { prototype: false });

  equal([12,87,55].max(), [87], 'Array#max | 87', { prototype: 87 });
  equal([-12,-87,-55].max(), [-12], 'Array#max | -12', { prototype: -12 });
  equal([5,5,128].max(), [128], 'Array#max | 128', { prototype: 128 });
  equal([128,128,128].max(), [128], 'Array#max | 128 is uniqued', { prototype: 128 });
  equal(['a','b','c'].max(), [], 'Array#max | strings are not counted', { prototype: 'c' });
  equal([].max(), [], 'Array#max | empty array', { prototype: undefined });
  equal([null].max(), [], 'Array#max | [null]', { prototype: null });
  equal([undefined].max(), [], 'Array#max | [undefined]', { prototype: undefined });
  equal([{a:1,b:5},{a:2,b:5},{a:3,b:5}].max(function(el) { return el['a']; }), [{a:3,b:5}], 'Array#max | key "a"', { prototype: 3 });
  equal([{a:1,b:5},{a:2,b:4},{a:3,b:3}].max(function(el) { return el['b']; }), [{a:1,b:5}], 'Array#max | key "b" returns b:5', { prototype: 5 });
  equal([{a:1,b:3},{a:2,b:4},{a:3,b:3}].max(function(el) { return el['b']; }), [{a:2,b:4}], 'Array#max | key "b" returns b:4', { prototype: 4 });
  equal([{a:1,b:3},{a:2,b:4},{a:2,b:4}].max(function(el) { return el['b']; }), [{a:2,b:4}], 'Array#max | key "b" returns b:4 uniqued', { prototype: 4 });
  equal([{a:1,b:3},{a:2,b:1},{a:3,b:3}].max(function(el) { return el['b']; }), [{a:1,b:3},{a:3,b:3}], 'Array#max | key "b", 2 found', { prototype: 3 });
  equal([{a:-1,b:-5},{a:-2,b:-4},{a:-3,b:-3}].max(function(el) { return el['b']; }), [{a:-3,b:-3}], 'Array#max | key "b" returns b:-3', { prototype: -3 });
  equal(['short','and', 'mort'].max(function(el) { return el.length; }), ['short'], 'Array#max | length', { prototype: 5 });
  equal(['short','and', 'morts', 'fat'].max(function(el) { return el.length; }), ['short','morts'], 'Array#max | short,morts', { prototype: 5 });




  var people = [
    { name: 'jim',    age: 27, hair: 'brown'  },
    { name: 'mary',   age: 52, hair: 'blonde' },
    { name: 'ronnie', age: 13, hair: 'brown'  },
    { name: 'edmund', age: 27, hair: 'blonde' }
  ];

  raisesError(function() { [1,2,3].most(undefined); }, 'Array#most | raises an error on undefined');
  raisesError(function() { [1,2,3].most(null); }, 'Array#most | raises an error on null');
  raisesError(function() { [1,2,3].most(4); }, 'Array#most | raises an error on number');

  equal(people.most(function(person) { return person.age; }), [{name:'jim',age:27,hair:'brown'},{name:'edmund',age:27,hair:'blonde'}], 'Array#most | age');
  equal(people.most(function(person) { return person.hair; }), [], 'Array#most | hair');

  equal([].most(), [], 'Array#most | empty array');
  equal([1,2,3].most(), [], 'Array#most | 1,2,3');
  equal([1,2,3,3].most(), [3], 'Array#most | 1,2,3,3');
  equal([1,1,2,3,3].most(), [1,3], 'Array#most | 1,1,2,3,3');
  equal(['a','b','c'].most(), [], 'Array#most | a,b,c');
  equal(['a','b','c','c'].most(), ['c'], 'Array#most | a,b,c,c');
  equal(['a','a','b','c','c'].most(), ['a','c'], 'Array#most | a,a,b,c,c');

  // Leaving this here as a reference for how to collect the actual number of occurences.
  equal(people.most(function(person) { return person.age; }).length, 2, 'Array#most | collect actual number of occurrences');


  raisesError(function() { [1,2,3].least(undefined); }, 'Array#least | raises an error on undefined');
  raisesError(function() { [1,2,3].least(null); }, 'Array#least | raises an error on null');
  raisesError(function() { [1,2,3].least(4); }, 'Array#least | raises an error on number');

  equal(people.least(function(person) { return person.age; }).sortBy('name'), [people[1], people[2]], 'Array#least | contains mary and ronnie');
  equal(people.least(function(person) { return person.age; }).sortBy('age'), [{name:'ronnie',age:13,hair:'brown'}, {name:'mary',age:52,hair:'blonde'}], 'Array#least | age and sorted by age');

  equal(people.least(function(person) { return person.hair; }), [], 'Array#least | hair');

  equal([].least(), [], 'Array#least | empty array');
  equal([1,2,3].least(), [], 'Array#least | 1,2,3');
  equal([1,2,3,3].least(), [1,2], 'Array#least | 1,2,3,3');
  equal([1,1,2,3,3].least(), [2], 'Array#least | 1,1,2,3,3');
  equal([1,1,1,2,2,3,3,3].least(), [2], 'Array#least | 1,1,1,2,2,3,3,3');
  equal(['a','b','c'].least(), [], 'Array#least | a,b,c');
  equal(['a','b','c','c'].least(), ['a','b'], 'Array#least | a,b,c,c');
  equal(['a','a','b','c','c'].least(), ['b'], 'Array#least | a,a,b,c,c');

  // Leaving this here as a reference for how to collect the actual number of occurences.
  equal(people.least(function(person) { return person.age; }).length, 2, 'Array#least | collect actual number of occurences');




  equal([12,87,55].sum(), 154, 'Array#sum | 12,87,55');
  equal([12,87,128].sum(), 227, 'Array#sum | 12,87,128');
  equal([].sum(), 0, 'Array#sum | empty array is 0');
  equal([null, false].sum(), 0, 'Array#sum | [null,false] is 0');
  equal([{a:1,b:5},{a:2,b:5},{a:3,b:5}].sum(function(el) { return el['a']; }), 6, 'Array#sum | key "a"');
  equal([{a:1,b:5},{a:2,b:5},{a:3,b:5}].sum('a'), 6, 'Array#sum | shortcut for key "a"');

  equal([13,18,13,14,13,16,14,21,13].average(), 15, 'Array#average | 13,18,13,14,13,16,14,21,13');
  equal([2,2,2].average(), 2, 'Array#average | 2,2,2');
  equal([2,3,4].average(), 3, 'Array#average | 2,3,4');
  equal([2,3,4,2].average(), 2.75, 'Array#average | 2,3,4,2');
  equal([].average(), 0, 'Array#average | empty array is 0');
  equal([null, false].average(), 0, 'Array#average | [null, false] is 0');
  equal([{a:1,b:5},{a:2,b:5},{a:3,b:5}].average(function(el) { return el['a']; }), 2, 'Array#average | key "a"');
  equal([{a:1,b:5},{a:2,b:5},{a:3,b:5}].average('a'), 2, 'Array#average | shortcut for key "a"');


  equal(people.average('age'), 29.75, 'Array#average | people average age is 29.75');
  equal(people.average(function(p) { return p.age; }), 29.75, 'Array#average | people average age is 29.75 by function');
  equal(isNaN(people.average(function(p) { return p.hair; })), true, 'Array#average | people average hair is NaN');


  var grouped;

  equal([].groupBy(), {}, 'Array#groupBy | empty array');
  equal([1,1,2,2,3,3,4].groupBy(), {1:[1,1],2:[2,2],3:[3,3],4:[4]}, 'Array#groupBy | 1,1,2,2,3,3,4');
  equal(['a','b','c','a','e','c'].groupBy(), {'a':['a','a'],'b':['b'],'c':['c','c'],'e':['e']}, 'Array#groupBy | a,b,c,a,e,c');
  equal([{a:1,b:5},{a:8,b:5},{a:8,b:3}].groupBy('a'), {8:[{a:8,b:5},{a:8,b:3}],1:[{a:1,b:5}]}, 'Array#groupBy | grouping by "a"');
  equal([{a:1,b:5},{a:8,b:5},{a:8,b:3}].groupBy(function(el) { return el['a']; }), {8:[{a:8,b:5},{a:8,b:3}],1:[{a:1,b:5}]}, 'Array#groupBy | grouping by "a" by function');


  people = people.sortBy('hair');
  equal(people.groupBy(function(p) { return p.age; }), {27: [{name:'edmund',age:27,hair:'blonde'},{name:'jim',age:27,hair:'brown'}],52:[{name:'mary',age:52,hair:'blonde'}],13:[{name:'ronnie',age:13,hair:'brown'}]}, 'Array#groupBy | grouping people by age');

  raisesError(function() { [1,2,3].groupBy(undefined); }, 'Array#groupBy | raises an error on undefined');
  raisesError(function() { [1,2,3].groupBy(null); }, 'Array#groupBy | raises an error on null');
  raisesError(function() { [1,2,3].groupBy(4); }, 'Array#groupBy | raises an error on number');




  equal([1,2,3,4,5,6,7,8,9,10].inGroups(1), [[1,2,3,4,5,6,7,8,9,10]], 'Array#inGroups | in groups of 1');
  equal([1,2,3,4,5,6,7,8,9,10].inGroups(2), [[1,2,3,4,5],[6,7,8,9,10]], 'Array#inGroups | in groups of 2');
  equal([1,2,3,4,5,6,7,8,9,10].inGroups(3), [[1,2,3,4],[5,6,7,8],[9,10]], 'Array#inGroups | in groups of 3');
  equal([1,2,3,4,5,6,7,8,9,10].inGroups(4), [[1,2,3],[4,5,6],[7,8,9],[10]], 'Array#inGroups | in groups of 4');
  equal([1,2,3,4,5,6,7,8,9,10].inGroups(5), [[1,2],[3,4],[5,6],[7,8],[9,10]], 'Array#inGroups | in groups of 5');
  equal([1,2,3,4,5,6,7,8,9,10].inGroups(6), [[1,2],[3,4],[5,6],[7,8],[9,10],[]], 'Array#inGroups | in groups of 6');
  equal([1,2,3,4,5,6,7,8,9,10].inGroups(7), [[1,2],[3,4],[5,6],[7,8],[9,10],[],[]], 'Array#inGroups | in groups of 7');


  equal([1,2,3,4,5,6,7,8,9,10].inGroups(3, null), [[1,2,3,4],[5,6,7,8],[9,10,null,null]], 'Array#inGroups | pad with null | in groups of 3');
  equal([1,2,3,4,5,6,7,8,9,10].inGroups(4, null), [[1,2,3],[4,5,6],[7,8,9],[10,null,null]], 'Array#inGroups | pad with null | in groups of 4');
  equal([1,2,3,4,5,6,7,8,9,10].inGroups(5, null), [[1,2],[3,4],[5,6],[7,8],[9,10]], 'Array#inGroups | pad with null | in groups of 5');
  equal([1,2,3,4,5,6,7,8,9,10].inGroups(6, null), [[1,2],[3,4],[5,6],[7,8],[9,10],[null,null]], 'Array#inGroups | pad with null | in groups of 6');
  equal([1,2,3,4,5,6,7,8,9,10].inGroups(7, null), [[1,2],[3,4],[5,6],[7,8],[9,10],[null,null],[null,null]], 'Array#inGroups | pad with null | in groups of 7');



  equal([1,2,3,4,5,6,7,8,9,10].inGroupsOf(3), [[1,2,3],[4,5,6],[7,8,9],[10,null,null]], 'Array#inGroupsOf | groups of 3 | 1 to 10');
  equal([1,2,3,4,5,6,7,8,9].inGroupsOf(3), [[1,2,3],[4,5,6],[7,8,9]], 'Array#inGroupsOf | groups of 3 | 1 to 9');
  equal([1,2,3,4,5,6,7,8].inGroupsOf(3), [[1,2,3],[4,5,6],[7,8,null]], 'Array#inGroupsOf | groups of 3 | 1 to 8');
  equal([1,2,3,4,5,6,7].inGroupsOf(3), [[1,2,3],[4,5,6],[7,null,null]], 'Array#inGroupsOf | groups of 3 | 1 to 7');
  equal([1,2,3,4,5,6].inGroupsOf(3), [[1,2,3],[4,5,6]], 'Array#inGroupsOf | groups of 3 | 1 to 6');
  equal([1,2,3,4,5].inGroupsOf(3), [[1,2,3],[4,5,null]], 'Array#inGroupsOf | groups of 3 | 1 to 5');
  equal([1,2,3,4].inGroupsOf(3), [[1,2,3],[4,null,null]], 'Array#inGroupsOf | groups of 3 | 1 to 4');
  equal([1,2,3].inGroupsOf(3), [[1,2,3]], 'Array#inGroupsOf | groups of 3 | 1 to 3');
  equal([1,2].inGroupsOf(3), [[1,2,null]], 'Array#inGroupsOf | groups of 3 | 1 to 2');
  equal([1].inGroupsOf(3), [[1,null,null]], 'Array#inGroupsOf | groups of 3 | 1');

  equal([1,2,3,4,5,6,7,8,9,10].inGroupsOf(3, null), [[1,2,3],[4,5,6],[7,8,9],[10, null, null]], 'Array#inGroupsOf | groups of 3 | pad with null | 1 to 10');
  equal([1,2,3,4,5,6,7,8,9].inGroupsOf(3, null), [[1,2,3],[4,5,6],[7,8,9]], 'Array#inGroupsOf | groups of 3 | pad with null | 1 to 9');
  equal([1,2,3,4,5,6,7,8].inGroupsOf(3, null), [[1,2,3],[4,5,6],[7,8, null]], 'Array#inGroupsOf | groups of 3 | pad with null | 1 to 8');
  equal([1,2,3,4,5,6,7].inGroupsOf(3, null), [[1,2,3],[4,5,6],[7, null, null]], 'Array#inGroupsOf | groups of 3 | pad with null | 1 to 7');
  equal([1,2,3,4,5,6].inGroupsOf(3, null), [[1,2,3],[4,5,6]], 'Array#inGroupsOf | groups of 3 | pad with null | 1 to 6');
  equal([1,2,3,4,5].inGroupsOf(3, null), [[1,2,3],[4,5,null]], 'Array#inGroupsOf | groups of 3 | pad with null | 1 to 5');
  equal([1,2,3,4].inGroupsOf(3, null), [[1,2,3],[4,null,null]], 'Array#inGroupsOf | groups of 3 | pad with null | 1 to 4');
  equal([1,2,3].inGroupsOf(3, null), [[1,2,3]], 'Array#inGroupsOf | groups of 3 | pad with null | 1 to 3');
  equal([1,2].inGroupsOf(3, null), [[1,2,null]], 'Array#inGroupsOf | groups of 3 | pad with null | 1 to 2');
  equal([1].inGroupsOf(3, null), [[1,null,null]], 'Array#inGroupsOf | groups of 3 | pad with null | 1');

  equal([1].inGroupsOf(3, ' '), [[1,' ',' ']], 'Array#inGroupsOf | pad with spaces');
  equal([1].inGroupsOf(3, true), [[1,true,true]], 'Array#inGroupsOf | pad with true');
  equal([1].inGroupsOf(3, false), [[1,false,false]], 'Array#inGroupsOf | pad with false');

  equal([1].inGroupsOf(), [[1]], 'Array#inGroupsOf | no argument', { prototype: [] });
  equal([1].inGroupsOf(1, null), [[1]], 'Array#inGroupsOf | pad with null | no argument');

  equal([1].inGroupsOf(0), [1], 'Array#inGroupsOf | 0');
  equal([1].inGroupsOf(0, null), [1], 'Array#inGroupsOf | pad with null | 0');

  equal([1].inGroupsOf(3, null), [[1, null, null]], 'Array#inGroupsOf | pad with null | 3');
  equal([1].inGroupsOf(1, null), [[1]], 'Array#inGroupsOf | pad with null | 1');
  equal([].inGroupsOf(3), [], 'Array#inGroupsOf | empty array');
  equal([].inGroupsOf(3, null), [], 'Array#inGroupsOf | pad with null | empty array');
  equal([null].inGroupsOf(3), [[null,null,null]], 'Array#inGroupsOf | [null] in groups of 3');
  equal([null].inGroupsOf(3, null), [[null,null,null]], 'Array#inGroupsOf | pad with null | [null] in groups of 3');
  equal([1].inGroupsOf(3, undefined), [[1,null,null]], 'Array#inGroupsOf | passing undefined reverts to null');



  // Emulating example of Enumerable#each_slice
  equal((1).upto(10).inGroupsOf(3).map(function(g) { return g[1]; }).compact(), [2,5,8], 'Array#inGroupsOf | 1 to 10 in groups of 3 compacted');



  equal([1,2,3].compact(), [1,2,3], 'Array#compact | 1,2,3');
  equal([1,2,null,3].compact(), [1,2,3], 'Array#compact | 1,2,null,3');
  equal([1,2,undefined,3].compact(), [1,2,3], 'Array#compact | 1,2,undefined,3');
  equal([undefined,undefined,undefined].compact(), [], 'Array#compact | undefined,undefined,undefined');
  equal([null,null,null].compact(), [], 'Array#compact | null,null,null');
  equal([NaN,NaN,NaN].compact(), [], 'Array#compact | NaN,NaN,NaN', { prototype: [NaN,NaN,NaN] });
  equal(['','',''], ['','',''], 'Array#compact | empty strings');
  equal([false,false,false].compact(), [false,false,false], 'Array#compact | false is left alone');
  equal([0,1,2].compact(), [0,1,2], 'Array#compact | 0,1,2');
  equal([].compact(), [], 'Array#compact | empty array');
  equal(['a','b','c'].compact(), ['a','b','c'], 'Array#compact | a,b,c');
  equal([f1, f2].compact(), [f1, f2], 'Array#compact | functions');
  equal([null,[null],[false,[null,undefined,3]]].compact(), [[],[false,[3]]], 'Array#compact | deep compacts as well', { prototype: [[null],[false,[null,undefined,3]]] });
  equal([null,null,null,[null],null].compact(), [[]], "Array#compact | deep compact doesn't have index conflicts", { prototype: [[null]] });

  equal([false,false,false].compact(true), [], 'Array#compact | falsy | false is removed');
  equal([0,0].compact(true), [], 'Array#compact | falsy | 0');
  equal(['',''].compact(true), [], 'Array#compact | falsy | empty string');
  equal([' ',' '].compact(true), [' ',' '], 'Array#compact | falsy | strings with spaces are kept');
  equal([8,3].compact(true), [8,3], 'Array#compact | falsy | numbers are kept');
  equal([false,undefined,false,null,NaN].compact(true), [], 'Array#compact | falsy | others are also handled');

  equal([1,2,2,3].count(), 4, 'Array#count | no arugment numeric');
  equal([1,2,2,3].count(2), 2, 'Array#count | count 2s');
  equal(['a','b','c','c'].count(), 4, 'Array#count | no argument alphabet');
  equal(['a','b','c','c'].count('c'), 2, 'Array#count | count "c"s');
  equal([1,2,2,3].count(function(el) { return el % 2 == 0; }), 2, 'Array#count | count all odd numbers');
  equal([1,2,2,3].count(function(el) { return el > 2; }), 1, 'Array#count | count all numbers greater than 2');
  equal([1,2,2,3].count(function(el) { return el > 20; }), 0, 'Array#count | count all numbers greater than 20');
  equal([{a:1},{a:2},{a:1}].count({a:1}), 2, 'Array#count | count all a:1', { prototype: 0 });





  equal([1,2,2,3].remove(), [1,2,2,3], 'Array#remove | no argument numeric');
  equal([1,2,2,3].remove(2), [1,3], 'Array#remove | remove 2s');
  equal([0,1,2].exclude(0), [1,2], 'Array#remove | finds 0');
  equal(['a','b','c','c'].remove(), ['a','b','c','c'], 'Array#remove | no argument alphabet');
  equal(['a','b','c','c'].remove('c'), ['a','b'], 'Array#remove | remove "c"s');
  equal([1,2,2,3].remove(function(el) { return el % 2 == 0; }), [1,3], 'Array#remove | remove all odd numbers');
  equal([1,2,2,3].remove(function(el) { return el > 2; }), [1,2,2], 'Array#remove | remove all numbers greater than 2');
  equal([1,2,2,3].remove(function(el) { return el > 20; }), [1,2,2,3], 'Array#remove | remove all numbers greater than 20');
  equal([{a:1},{a:2},{a:1}].remove({a:1}), [{a:2}], 'Array#remove | remove all a:1');
  ['a'].remove(function(el,i,arr) {
    equal(el, 'a', 'Array#remove | first param should be the element');
    equal(i, 0, 'Array#remove | second param should be the index');
    equal(arr, ['a'], 'Array#remove | third param should be the array');
  });

  arr = [1,2,3];
  arr.remove(2);
  equal(arr, [1,3], 'Array#remove | should affect the original array');

  arr = [1,2,3];
  arr.remove(2,3);
  equal(arr, [1], 'Array#remove | can remove multiple elements');

  equal([f1].remove(f1), [], 'Array#remove | can find via strict equality');
  equal([1,2,3].remove([1,3]), [2], 'Array#remove | reverse concat like add');



  equal([1,2,2,3].exclude(), [1,2,2,3], 'Array#exclude | no argument numeric');
  equal([1,2,2,3].exclude(2), [1,3], 'Array#exclude | exclude 2s');
  equal([0,1,2].exclude(0), [1,2], 'Array#exclude | finds 0');
  equal(['a','b','c','c'].exclude(), ['a','b','c','c'], 'Array#exclude | no argument alphabet');
  equal(['a','b','c','c'].exclude('c'), ['a','b'], 'Array#exclude | exclude "c"s');
  equal([1,2,2,3].exclude(function(el){ return el % 2 == 0; }), [1,3], 'Array#exclude | exclude all odd numbers');
  equal([1,2,2,3].exclude(function(el){ return el > 2; }), [1,2,2], 'Array#exclude | exclude all numbers greater than 2');
  equal([1,2,2,3].exclude(function(el){ return el > 20; }), [1,2,2,3], 'Array#exclude | exclude all numbers greater than 20');
  equal([{a:1},{a:2},{a:1}].exclude({a:1}), [{a:2}], 'Array#exclude | exclude all a:1');
  ['a'].exclude(function(el,i,arr){
    equal(el, 'a', 'Array#exclude | first param should be the element');
    equal(i, 0, 'Array#exclude | second param should be the index');
    equal(arr, ['a'], 'Array#exclude | third param should be the array');
  });

  arr = [1,2,3];
  arr.exclude(2);
  equal(arr, [1,2,3], 'Array#exclude | should not affect the original array');

  equal([1,2,2,3].exclude(2,3), [1], 'Array#exclude | can handle multiple arguments');
  equal([f1].exclude(f1), [], 'Array#exclude | can find via strict equality');

  equal([1,2,3].exclude([1,3]), [2], 'Array#exclude | reverse concat like include');




  equal([1,2,2,3].removeAt(), [1,2,2,3], 'Array#removeAt | numeric | no argument');
  equal([1,2,2,3].removeAt(0), [2,2,3], 'Array#removeAt | numeric | 0');
  equal([1,2,2,3].removeAt(1), [1,2,3], 'Array#removeAt | numeric | 1');
  equal([1,2,2,3].removeAt(2), [1,2,3], 'Array#removeAt | numeric | 2');
  equal([1,2,2,3].removeAt(3), [1,2,2], 'Array#removeAt | numeric | 3');
  equal([1,2,2,3].removeAt(4), [1,2,2,3], 'Array#removeAt | numeric | 4');
  equal(['a','b','c','c'].removeAt(), ['a','b','c','c'], 'Array#removeAt | alphabet | no argument');
  equal(['a','b','c','c'].removeAt(0), ['b','c','c'], 'Array#removeAt | alphabet | 0');
  equal(['a','b','c','c'].removeAt(1), ['a','c','c'], 'Array#removeAt | alphabet | 1');
  equal(['a','b','c','c'].removeAt(2), ['a','b','c'], 'Array#removeAt | alphabet | 2');
  equal(['a','b','c','c'].removeAt(3), ['a','b','c'], 'Array#removeAt | alphabet | 3');
  equal(['a','b','c','c'].removeAt(4), ['a','b','c','c'], 'Array#removeAt | alphabet | 4');
  equal([{a:1},{a:2},{a:1}].removeAt(1), [{a:1},{a:1}], 'Array#removeAt | objects | 1');
  equal([1,2,2,3].removeAt(0,1), [2,3], 'Array#removeAt | 0 to 1');
  equal([1,2,2,3].removeAt(0,2), [3], 'Array#removeAt | 0 to 2');
  equal([1,2,2,3].removeAt(1,2), [1,3], 'Array#removeAt | 1 to 2');
  equal([1,2,2,3].removeAt(1,5), [1], 'Array#removeAt | 1 to 5');
  equal([1,2,2,3].removeAt(0,5), [], 'Array#removeAt | 0 to 5');
  equal([1,2,2,3].removeAt(null,5), [], 'Array#removeAt | also accepts null');

  arr = [1,2,3];
  arr.removeAt(1);
  equal(arr, [1,3], 'Array#removeAt | should affect the original array');







  equal([1,2,3].add(4), [1,2,3,4], 'Array#add | 1,2,3 + 4');
  equal(['a','b','c'].add('d'), ['a','b','c','d'], 'Array#add | a,b,c + d');
  equal([{a:1},{a:2}].add({a:3}), [{a:1},{a:2},{a:3}], 'Array#add | a:1,a:2 + a:3');
  equal([1,2,3].add([3,4,5]), [1,2,3,3,4,5], 'Array#add | 1,2,3 + 3,4,5');
  equal(['a','b','c'].add(['c','d','e']), ['a','b','c','c','d','e'], 'Array#add | a,b,c + c,d,e');
  equal([1,2,3].add([1,2,3]), [1,2,3,1,2,3], 'Array#add | 1,2,3 + 1,2,3');
  equal([1,2,3].add([3,2,1]), [1,2,3,3,2,1], 'Array#add | 1,2,3 + 3,2,1');
  equal([].add([3]), [3], 'Array#add | empty array + 3');
  equal([3].add([]), [3], 'Array#add | 3 + empty array');
  equal([].add([]), [], 'Array#add | 2 empty arrays');
  equal([null].add([]), [null], 'Array#add | [null] + empty array');
  equal([null].add([null]), [null, null], 'Array#add | [null] + [null]');
  equal([false].add([false]), [false, false], 'Array#add | [false] + [false]');
  equal([false].add([0]), [false, 0], 'Array#add | [false] + [0]');
  equal([false].add([null]), [false, null], 'Array#add | [false] + [null]');
  equal([false].add([undefined]), [false, undefined], 'Array#add | [false] + [undefined]');
  equal([{a:1},{b:2}].add([{b:2},{c:3}]), [{a:1},{b:2},{b:2},{c:3}], 'Array#add | a:1,b:2 + b:2,c:3');
  equal([1,1,3].add([1,5,6]), [1,1,3,1,5,6], 'Array#add | 1,1,3 + 1,5,6');
  equal([1,2,3].add([4,5,6]), [1,2,3,4,5,6], 'Array#add | 1,2,3 + 4,5,6');
  equal([1,2,3].add(1), [1,2,3,1], 'Array#add | 1,2,3 + 1');

  equal([1,2,3].add(4, 1), [1,4,2,3], 'Array#add | index 1 | 4');
  equal(['a','b','c'].add('d', 1), ['a','d','b','c'], 'Array#add | index 1 | d');
  equal([{a:1},{a:2}].add({a:3}, 1), [{a:1},{a:3},{a:2}], 'Array#add | index 1 | a:3');
  equal([1,2,3].add(4, 2), [1,2,4,3], 'Array#add | index 2 | 4');
  equal(['a','b','c'].add('d', 2), ['a','b','d','c'], 'Array#add | index 2 | d');
  equal([{a:1},{a:2}].add({a:3}, 2), [{a:1},{a:2},{a:3}], 'Array#add | index 2 | a:3');
  equal(['a','b','c'].add('d', 5), ['a','b','c','d'], 'Array#add | index 5 | d');
  equal(['a','b','c'].add('d', 0), ['d','a','b','c'], 'Array#add | index 0 | d');
  equal(['a','b','c'].add('d', -1), ['a','b','d','c'], 'Array#add | index -1 | d');
  equal(['a','b','c'].add('d', -2), ['a','d','b','c'], 'Array#add | index -2 | d');
  equal(['a','b','c'].add('d', -3), ['d','a','b','c'], 'Array#add | index -3 | d');
  equal(['a','b','c'].add('d', null), ['a','b','c','d'], 'Array#add | null index | d');
  equal(['a','b','c'].add('d', undefined), ['a','b','c','d'], 'Array#add | undefined index | d');
  equal(['a','b','c'].add('d', 'a'), ['a','b','c','d'], 'Array#add | index a | d');
  equal(['a','b','c'].add('d', NaN), ['a','b','c','d'], 'Array#add | index NaN | d');

  arr = [1,2,3];
  arr.add(4);
  equal(arr, [1,2,3,4], 'Array#add | should affect the original array');



  equal([1,2,3].insert(4), [1,2,3,4], 'Array#insert | 1,2,3 + 4');
  equal(['a','b','c'].insert('d'), ['a','b','c','d'], 'Array#insert | a,b,c + d');
  equal([{a:1},{a:2}].insert({a:3}), [{a:1},{a:2},{a:3}], 'Array#insert | a:1,a:2 + a:3');
  equal([1,2,3].insert([3,4,5]), [1,2,3,3,4,5], 'Array#insert | 1,2,3 + 3,4,5');
  equal(['a','b','c'].insert(['c','d','e']), ['a','b','c','c','d','e'], 'Array#insert | a,b,c + c,d,e');
  equal([1,2,3].insert([1,2,3]), [1,2,3,1,2,3], 'Array#insert | 1,2,3 + 1,2,3');
  equal([1,2,3].insert([3,2,1]), [1,2,3,3,2,1], 'Array#insert | 1,2,3 + 3,2,1');
  equal([].insert([3]), [3], 'Array#insert | empty array + 3');
  equal([3].insert([]), [3], 'Array#insert | 3 + empty array');
  equal([].insert([]), [], 'Array#insert | 2 empty arrays');
  equal([null].insert([]), [null], 'Array#insert | [null] + empty array');
  equal([null].insert([null]), [null, null], 'Array#insert | [null] + [null]');
  equal([false].insert([false]), [false, false], 'Array#insert | [false] + [false]');
  equal([false].insert([0]), [false, 0], 'Array#insert | [false] + [0]');
  equal([false].insert([null]), [false, null], 'Array#insert | [false] + [null]');
  equal([false].insert([undefined]), [false, undefined], 'Array#insert | [false] + [undefined]');
  equal([{a:1},{b:2}].insert([{b:2},{c:3}]), [{a:1},{b:2},{b:2},{c:3}], 'Array#insert | a:1,b:2 + b:2,c:3');
  equal([1,1,3].insert([1,5,6]), [1,1,3,1,5,6], 'Array#insert | 1,1,3 + 1,5,6');
  equal([1,2,3].insert([4,5,6]), [1,2,3,4,5,6], 'Array#insert | 1,2,3 + 4,5,6');
  equal([1,2,3].insert(1), [1,2,3,1], 'Array#insert | 1,2,3 + 1');

  equal([1,2,3].insert(4, 1), [1,4,2,3], 'Array#insert | index 1 | 4');
  equal(['a','b','c'].insert('d', 1), ['a','d','b','c'], 'Array#insert | index 1 | d');
  equal([{a:1},{a:2}].insert({a:3}, 1), [{a:1},{a:3},{a:2}], 'Array#insert | index 1 | a:3');
  equal([1,2,3].insert(4, 2), [1,2,4,3], 'Array#insert | index 2 | 4');
  equal(['a','b','c'].insert('d', 2), ['a','b','d','c'], 'Array#insert | index 2 | d');
  equal([{a:1},{a:2}].insert({a:3}, 2), [{a:1},{a:2},{a:3}], 'Array#insert | index 2 | a:3');
  equal(['a','b','c'].insert('d', 5), ['a','b','c','d'], 'Array#insert | index 5 | d');
  equal(['a','b','c'].insert('d', 0), ['d','a','b','c'], 'Array#insert | index 0 | d');
  equal(['a','b','c'].insert('d', -1), ['a','b','d','c'], 'Array#insert | index -1 | d');
  equal(['a','b','c'].insert('d', -2), ['a','d','b','c'], 'Array#insert | index -2 | d');
  equal(['a','b','c'].insert('d', -3), ['d','a','b','c'], 'Array#insert | index -3 | d');
  equal(['a','b','c'].insert('d', null), ['a','b','c','d'], 'Array#insert | null index | d');
  equal(['a','b','c'].insert('d', undefined), ['a','b','c','d'], 'Array#insert | undefined index | d');
  equal(['a','b','c'].insert('d', 'a'), ['a','b','c','d'], 'Array#insert | index a | d');
  equal(['a','b','c'].insert('d', NaN), ['a','b','c','d'], 'Array#insert | index NaN | d');

  arr = [1,2,3];
  arr.insert(4);
  equal(arr, [1,2,3,4], 'Array#insert | should affect the original array');



  equal([1,2,3].include(4), [1,2,3,4], 'Array#include | 1,2,3 + 4', { prototype: false });
  equal(['a','b','c'].include('d'), ['a','b','c','d'], 'Array#include | a,b,c + d', { prototype: false });
  equal([{a:1},{a:2}].include({a:3}), [{a:1},{a:2},{a:3}], 'Array#include | a:1,a:2 + a:3', { prototype: false });
  equal([1,2,3].include([3,4,5]), [1,2,3,3,4,5], 'Array#include | 1,2,3 + 3,4,5', { prototype: false, mootools: [1,2,3,[3,4,5]] });
  equal(['a','b','c'].include(['c','d','e']), ['a','b','c','c','d','e'], 'Array#include | a,b,c + c,d,e', { prototype: false, mootools: ['a','b','c',['c','d','e']] });
  equal([1,2,3].include([1,2,3]), [1,2,3,1,2,3], 'Array#include | 1,2,3 + 1,2,3', { prototype: false, mootools: [1,2,3,[1,2,3]] });
  equal([1,2,3].include([3,2,1]), [1,2,3,3,2,1], 'Array#include | 1,2,3 + 3,2,1', { prototype: false, mootools: [1,2,3,[3,2,1]] });
  equal([].include([3]), [3], 'Array#include | empty array + 3', { prototype: false, mootools: [[3]] });
  equal([3].include([]), [3], 'Array#include | 3 + empty array', { prototype: false, mootools: [3,[]] });
  equal([].include([]), [], 'Array#include | 2 empty arrays', { prototype: false, mootools: [[]] });
  equal([null].include([]), [null], 'Array#include | [null] + empty array', { prototype: false, mootools: [null,[]] });
  equal([null].include([null]), [null, null], 'Array#include | [null] + [null]', { prototype: false, mootools: [null,[null]] });
  equal([false].include([false]), [false, false], 'Array#include | [false] + [false]', { prototype: false, mootools: [false,[false]] });
  equal([false].include([0]), [false, 0], 'Array#include | [false] + [0]', { prototype: true, mootools: [false,[0]] });
  equal([false].include([null]), [false, null], 'Array#include | [false] + [null]', { prototype: true, mootools: [false, [null]] });
  equal([false].include([undefined]), [false, undefined], 'Array#include | [false] + [undefined]', { prototype: true, mootools: [false,[undefined]] });
  equal([{a:1},{b:2}].include([{b:2},{c:3}]), [{a:1},{b:2},{b:2},{c:3}], 'Array#include | a:1,b:2 + b:2,c:3', { prototype: false, mootools: [{a:1},{b:2},[{b:2},{c:3}]] });
  equal([1,1,3].include([1,5,6]), [1,1,3,1,5,6], 'Array#include | 1,1,3 + 1,5,6', { prototype: false, mootools: [1,1,3,[1,5,6]] });
  equal([1,2,3].include([4,5,6]), [1,2,3,4,5,6], 'Array#include | 1,2,3 + 4,5,6', { prototype: false, mootools: [1,2,3,[4,5,6]] });
  equal([1,2,3].include(1), [1,2,3,1], 'Array#include | 1,2,3 + 1', { prototype: true, mootools: [1,2,3] });

  equal([1,2,3].include(4, 1), [1,4,2,3], 'Array#include | index 1 | 4', { prototype: false, mootools: [1,2,3,4] });
  equal(['a','b','c'].include('d', 1), ['a','d','b','c'], 'Array#include | index 1 | d', { prototype: false, mootools: ['a','b','c','d'] });
  equal([{a:1},{a:2}].include({a:3}, 1), [{a:1},{a:3},{a:2}], 'Array#include | index 1 | a:3', { prototype: false, mootools: [{a:1},{a:2},{a:3}] });
  equal([1,2,3].include(4, 2), [1,2,4,3], 'Array#include | index 2 | 4', { prototype: false, mootools: [1,2,3,4] });
  equal(['a','b','c'].include('d', 2), ['a','b','d','c'], 'Array#include | index 2 | d', { prototype: false, mootools: ['a','b','c','d'] });
  equal([{a:1},{a:2}].include({a:3}, 2), [{a:1},{a:2},{a:3}], 'Array#include | index 2 | a:3', { prototype: false });
  equal(['a','b','c'].include('d', 5), ['a','b','c','d'], 'Array#include | index 5 | d', { prototype: false });
  equal(['a','b','c'].include('d', 0), ['d','a','b','c'], 'Array#include | index 0 | d', { prototype: false, mootools: ['a','b','c','d'] });
  equal(['a','b','c'].include('d', -1), ['a','b','d','c'], 'Array#include | index -1 | d', { prototype: false, mootools: ['a','b','c','d'] });
  equal(['a','b','c'].include('d', -2), ['a','d','b','c'], 'Array#include | index -2 | d', { prototype: false, mootools: ['a','b','c','d'] });
  equal(['a','b','c'].include('d', -3), ['d','a','b','c'], 'Array#include | index -3 | d', { prototype: false, mootools: ['a','b','c','d'] });
  equal(['a','b','c'].include('d', null), ['a','b','c','d'], 'Array#include | null index | d', { prototype: false });
  equal(['a','b','c'].include('d', undefined), ['a','b','c','d'], 'Array#include | undefined index | d', { prototype: false });
  equal(['a','b','c'].include('d', 'a'), ['a','b','c','d'], 'Array#include | index a | d', { prototype: false });
  equal(['a','b','c'].include('d', NaN), ['a','b','c','d'], 'Array#include | index NaN | d', { prototype: false });

  arr = [1,2,3];
  arr.include(4);
  equal(arr, [1,2,3], 'Array#include | should not affect the original array', { mootools: [1,2,3,4] });


  arr = [1,2,3];
  var arr2 = arr.clone();
  equal(arr, arr2, 'Array#clone | should clone the array');
  arr2.remove(2);
  equal(arr, [1,2,3], 'Array#clone | original array should be untouched');
  equal(arr2, [1,3], 'Array#clone | new array should be modified');





  equal([1,2,3].isEmpty(), false, 'Array#empty | 1,2,3');
  equal([].isEmpty(), true, 'Array#empty | empty array');
  equal([null].isEmpty(), true, 'Array#empty | [null]');
  equal([undefined].isEmpty(), true, 'Array#empty | [undefined]');
  equal([null,null].isEmpty(), true, 'Array#empty | [null,null]');
  equal([undefined,undefined].isEmpty(), true, 'Array#empty | [undefined,undefined]');
  equal([false,false].isEmpty(), false, 'Array#empty | [false,false]');
  equal([0,0].isEmpty(), false, 'Array#empty | [0,0]');


  raisesError(function(){ [1,2,3].any() }, 'Array#any | no argument raises a TypeError', { prototype: false });
  equal([1,2,3].any(1), true, 'Array#any | numeric | 1');
  equal([1,2,3].any(4), false, 'Array#any | numeric | 4');
  equal([1,2,3].any('a'), false, 'Array#any | numeric | a');
  equal(['a','b','c'].any('a'), true, 'Array#any | alphabet | a');
  equal(['a','b','c'].any('f'), false, 'Array#any | alphabet | f');
  equal(['a','b','c'].any(/[a-f]/), true, 'Array#any | alphabet | /[a-f]/', { prototype: false });
  equal(['a','b','c'].any(/[m-z]/), false, 'Array#any | alphabet | /[m-z]/');
  equal([{a:1},{a:2},{a:1}].any(1), false, 'Array#any | objects | 1');
  equal([0].any(0), true, 'Array#any | [0] | 0');
  equal([{a:1},{a:2},{a:1}].any({a:1}), true, 'Array#any | objects | a:1', { prototype: false });

  equal(['a','b','c'].any(function(e) { return e.length > 1; }), false, 'Array#any | alphabet | length greater than 1');
  equal(['a','b','c'].any(function(e) { return e.length < 2; }), true, 'Array#any | alphabet | length less than 2');
  equal(['a','bar','cat'].any(function(e) { return e.length < 2; }), true, 'Array#any | a,bar,cat | length less than 2');
  equal([{a:1},{a:2},{a:1}].any(function(e) { return e['a'] == 1; }), true, 'Array#any | objects | key "a" is 1');
  equal([{a:1},{a:2},{a:1}].any(function(e) { return e['b'] == 1; }), false, 'Array#any | objects | key "b" is 1');

  [1].any(function() {
    equal(this, 'wasabi', 'Array#any | scope should be passable');
  }, 'wasabi');


  raisesError(function(){ [1,2,3].has(); }, 'Array#has | no argument raises a TypeError', { prototype: false });
  equal([1,2,3].has(1), true, 'Array#has | numeric | 1');
  equal([1,2,3].has(4), false, 'Array#has | numeric | 4');
  equal([1,2,3].has('a'), false, 'Array#has | numeric | a');
  equal(['a','b','c'].has('a'), true, 'Array#has | alphabet | a');
  equal(['a','b','c'].has('f'), false, 'Array#has | alphabet | f');
  equal(['a','b','c'].has(/[a-f]/), true, 'Array#has | alphabet | /[a-f]/');
  equal(['a','b','c'].has(/[m-z]/), false, 'Array#has | alphabet | /[m-z]/');
  equal(['a','b','c'].has(function(e) { return e.length > 1; }), false, 'Array#has | alphabet | length greater than 1');
  equal(['a','b','c'].has(function(e) { return e.length < 2; }), true, 'Array#has | alphabet | length less than 2');
  equal(['a','bar','cat'].has(function(e) { return e.length < 2; }), true, 'Array#has | a,bar,cat | length less than 2');
  equal([{a:1},{a:2},{a:1}].has(1), false, 'Array#has | objects | 1');
  equal([{a:1},{a:2},{a:1}].has({a:1}), true, 'Array#has | objects | a:1');
  equal([{a:1},{a:2},{a:1}].has(function(e) { return e['a'] == 1; }), true, 'Array#has | objects | key "a" is 1');
  equal([{a:1},{a:2},{a:1}].has(function(e) { return e['b'] == 1; }), false, 'Array#has | objects | key "b" is 1');




  raisesError(function() { [1,2,3].none(); }, 'Array#none | no argument raises a TypeError', { prototype: false });
  equal([1,2,3].none(1), false, 'Array#none | numeric | 1');
  equal([1,2,3].none(4), true, 'Array#none | numeric | 4');
  equal([1,2,3].none('a'), true, 'Array#none | numeric | a');
  equal(['a','b','c'].none('a'), false, 'Array#none | alphabet | a');
  equal(['a','b','c'].none('f'), true, 'Array#none | alphabet | f');
  equal(['a','b','c'].none(/[a-f]/), false, 'Array#none | alphabet | /[a-f]/', { prototype: true });
  equal(['a','b','c'].none(/[m-z]/), true, 'Array#none | alphabet | /[m-z]/');
  equal([{a:1},{a:2},{a:1}].none(1), true, 'Array#none | objects | 1');
  equal([{a:1},{a:2},{a:1}].none({a:1}), false, 'Array#none | objects | a:1', { prototype: true });

  equal(['a','b','c'].none(function(e) { return e.length > 1; }), true, 'Array#none | alphabet | length is greater than 1');
  equal(['a','b','c'].none(function(e) { return e.length < 2; }), false, 'Array#none | alphabet | length is less than 2');
  equal(['a','bar','cat'].none(function(e) { return e.length < 2; }), false, 'Array#none | a,bar,cat | length is less than 2');
  equal([{a:1},{a:2},{a:1}].none(function(e) { return e['a'] == 1; }), false, 'Array#none | objects | key "a" is 1');
  equal([{a:1},{a:2},{a:1}].none(function(e) { return e['b'] == 1; }), true, 'Array#none | objects | key "b" is 1');




  raisesError(function() { [1,2,3].all(); }, 'Array#all | no argument raises a type error', { prototype: false });
  equal([1,2,3].all(1), false, 'Array#all | numeric | 1');
  equal([1,1,1].all(1), true, 'Array#all | numeric | 1 is true for all');
  equal([1,2,3].all(3), false, 'Array#all | numeric | 3');
  equal(['a','b','c'].all('a'), false, 'Array#all | alphabet | a');
  equal(['a','a','a'].all('a'), true, 'Array#all | alphabet | a is true for all');
  equal(['a','b','c'].all('f'), false, 'Array#all | alphabet | f');
  equal(['a','b','c'].all(/[a-f]/), true, 'Array#all | alphabet | /[a-f]/', { prototype: false });
  equal(['a','b','c'].all(/[a-b]/), false, 'Array#all | alphabet | /[m-z]/');
  equal([{a:1},{a:2},{a:1}].all(1), false, 'Array#all | objects | 1');
  equal([{a:1},{a:2},{a:1}].all({a:1}), false, 'Array#all | objects | a:1');
  equal([{a:1},{a:1},{a:1}].all({a:1}), true, 'Array#all | objects | a:1 is true for all', { prototype: false });


  equal(['a','b','c'].all(function(e) { return e.length > 1; }), false, 'Array#all | alphabet | length is greater than 1');
  equal(['a','b','c'].all(function(e) { return e.length < 2; }), true, 'Array#all | alphabet | length is less than 2');
  equal(['a','bar','cat'].all(function(e) { return e.length < 2; }), false, 'Array#all | a,bar,cat | length is less than 2');
  equal([{a:1},{a:2},{a:1}].all(function(e) { return e['a'] == 1; }), false, 'Array#all | objects | key "a" is 1');
  equal([{a:1},{a:2},{a:1}].all(function(e) { return e['b'] == 1; }), false, 'Array#all | objects | key "b" is 1');
  equal([{a:1},{a:1},{a:1}].all(function(e) { return e['a'] == 1; }), true, 'Array#all | objects | key "a" is 1 for all');


  [1].all(function() {
    equal(this, 'wasabi', 'Array#all | scope should be passable');
  }, 'wasabi');



  equal([1,2,3].flatten(), [1,2,3], 'Array#flatten | 1,2,3');
  equal(['a','b','c'].flatten(), ['a','b','c'], 'Array#flatten | a,b,c');
  equal([{a:1},{a:2},{a:1}].flatten(), [{a:1},{a:2},{a:1}], 'Array#flatten | a:1,a:2,a:1');
  equal([[1],[2],[3]].flatten(), [1,2,3], 'Array#flatten | [1],[2],[3]');
  equal([[1,2],[3]].flatten(), [1,2,3], 'Array#flatten | [1,2],[3]');
  equal([[1,2,3]].flatten(), [1,2,3], 'Array#flatten | [1,2,3]');
  equal([['a'],['b'],['c']].flatten(), ['a','b','c'], 'Array#flatten | [a],[b],[c]');
  equal([['a','b'],['c']].flatten(), ['a','b','c'], 'Array#flatten | [a,b],[c]');
  equal([['a','b','c']].flatten(), ['a','b','c'], 'Array#flatten | [a,b,c]');
  equal([[{a:1}],[{a:2}],[{a:1}]].flatten(), [{a:1},{a:2},{a:1}], 'Array#flatten | [a:1],[a:2],[a:1]');
  equal([[{a:1},{a:2}],[{a:1}]].flatten(), [{a:1},{a:2},{a:1}], 'Array#flatten | [a:1,a:2],[a:1]');
  equal([[{a:1},{a:2},{a:1}]].flatten(), [{a:1},{a:2},{a:1}], 'Array#flatten | [a:1,a:2,a:1]');
  equal([[[['a','b'],'c',['d','e']],'f'],['g']].flatten(), ['a','b','c','d','e','f','g'], 'Array#flatten | [[a,b],c,[d,e],f],g');





  arr = ['more','everyone!','bring','the','family'];
  equal(arr.sortBy('length'), ['the','more','bring','family','everyone!'], 'Array#sortBy | sorting by length');
  equal(arr.sortBy('length', true), ['everyone!','family','bring','more','the'], 'Array#sortBy | desc | sorting by length', { prototype: ['the','more','bring','family','everyone!'] });

  equal(arr.sortBy(function(a) { return a.length; }), ['the','more','bring','family','everyone!'], 'Array#sortBy | sort by length by function');
  equal(arr.sortBy(function(a) { return a.length; }, true), ['everyone!','family','bring','more','the'], 'Array#sortBy | desc | sort by length by function', { prototype: ['the','more','bring','family','everyone!'] });

  arr = [{a:'foo'},{a:'bar'},{a:'skittles'}];
  equal(arr.sortBy('a'), [{a:'bar'},{a:'foo'},{a:'skittles'}], 'Array#sortBy | sort by key "a"');
  equal(arr.sortBy('a', true), [{a:'skittles'},{a:'foo'},{a:'bar'}], 'Array#sortBy | desc | sort by key "a"', { prototype: [{a:'bar'},{a:'foo'},{a:'skittles'}] });

  raisesError(function() { [1,2,3].sortBy(undefined); }, 'Array#sortBy | raises an error on undefined', { prototype: false });
  raisesError(function() { [1,2,3].sortBy(null); }, 'Array#sortBy | raises an error on null', { prototype: false });
  raisesError(function() { [1,2,3].sortBy(4); }, 'Array#sortBy | raises an error on number', { prototype: false });



  arr = [1,2,3,4,5,6,7,8,9,10];
  var firsts = [];
  firsts.push(arr.randomize().first());
  firsts.push(arr.randomize().first());
  firsts.push(arr.randomize().first());
  firsts.push(arr.randomize().first());
  firsts.push(arr.randomize().first());
  firsts.push(arr.randomize().first());
  firsts.push(arr.randomize().first());
  firsts.push(arr.randomize().first());
  firsts.push(arr.randomize().first());
  firsts.push(arr.randomize().first());

  /* Note that there is a built-in 0.00000001% chance that this test will fail */
  equal(firsts.all(function(a) { return a == 1; }), false, 'Array#randomize');




  // Inherits from array...

  var Soup = function(){}, x;
  Soup.prototype = [1,2,3];

  x = new Soup();
  count = 0;

  x.each(function() {
    count++;
  });
  x.find(function() {
    count++;
  });
  x.findAll(function() {
    count++;
  });

  equal(count, 9, 'Array | array elements in the prototype chain are also properly iterated');


  // Inherits from sparse array...

  arr = ['a'];
  arr[20] = 'b';

  Soup.prototype = arr;

  x = new Soup();
  count = 0;

  x.each(function() {
    count++;
  });

  equal(count, 2, 'Array | sparse array elements in the prototype chain are also properly iterated');

  //Array.prototype.each.
  // This test cannot be framed in a meaninful way... IE will not set the length property
  // when pushing new elements and other browsers will not work on sparse arrays...
  // equal(count, 6, 'Array | objects that inherit from arrays can still iterate');

});

