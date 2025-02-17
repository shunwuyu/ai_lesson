var compose = function(f,g) {
  return function(x) {
      return f(g(x));
  };
};

var greet = compose(hello, toUpperCase);

greet('kevin');