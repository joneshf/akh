var Cont = require('../index').cont;

var sqr = function(x) { return x * x; };


exports.simple_of = function(test) {
    var c = Cont.of(3);
    
    test.deepEqual(
        Cont.runCont(c, sqr),
        9);
    
    test.done();
};

exports.simple_chain = function(test) {
    var c = Cont.of(3).chain(function(x) {
        return Cont.of(x + 5); 
    });
    
    test.deepEqual(
        Cont.runCont(c, sqr),
        64);
    test.done();
};

exports.chain = function(test) {
    var c = Cont.of(3)
        .chain(function(x) {
            return Cont.of(x + 5); 
        })
        .chain(function(x) {
            return Cont.of(x / 2);
        });
    
    test.deepEqual(
        Cont.runCont(c, sqr),
        16);
    test.done();
};

exports.simple_callcc = function(test) {
    var c = Cont.of(3).callcc(function(k) {
        return k(4); 
    });
    
    test.deepEqual(
        Cont.runCont(c, sqr),
        16);
    test.done();
};

exports.callcc_breaks = function(test) {
    var c = Cont.of(3).callcc(function(k) {
        return k(4)
            .chain(function() { return Cont.of(1); });
    });
    
    test.deepEqual(
        Cont.runCont(c, sqr),
        16);
    test.done();
};

exports.callcc_chain = function(test) {
    var c = Cont.of(3)
        .callcc(function(k) {
            return k(5);
        })
        .chain(function(x) {
            return Cont.of(x + 1);
        });
    
    test.deepEqual(
        Cont.runCont(c, sqr),
        36);
    test.done();
};
