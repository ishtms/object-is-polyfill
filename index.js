/*
  TODO: Add closure to maintain a local state.
*/
if (!Object.is) {
  Object.is = function ObjectIs() {
    /* Setting the limit to two arguments for now. I might
     extend this to support unlimited arguments later */

    /* Not testing for type Symbol as it wasn't available on
    older versions of Javascript */
    var args_one = arguments[0], args_two = arguments[1];
    if (typeof args_one !== typeof args_two) return false;

    /* Since both the types are equal, we can check for type 
    of either values */
    switch (typeof args_one) {
      case 'bigint':
      /* Big int can be of: 
        1. type Xn - where X is any valid integer 
        2. class BigInt(x) - where X is any valid integer
      */
      case 'boolean':
      case 'function':
      case 'string':
      case 'undefined':
      case 'object':
        return args_one === args_two;

      case 'number':
        /* Some cases where we might need additional checking:
          1. isNaN ? 
          2. -0 ?
        */
        if (Number.isNaN(args_one)) {
          return Number.isNaN(args_two) ? true : false;
        }
        if (Number.isNaN(args_two)) {
          return Number.isNaN(args_one) ? true : false;
        }
        /*
          Checking for negative 0 as,
          -0 === 0 // TRUE
          but Object.is(-0, 0) // FALSE
        */
        if (args_one === 0) {
          if (args_two === 0) {
            if (1 / args_one === Infinity) return (1 / args_two) === Infinity;
            if (1 / args_one === -Infinity) return (1 / args_two) === -Infinity
          } else {
            return false;
          }
        }

        return args_one === args_two;
    }
  };
}