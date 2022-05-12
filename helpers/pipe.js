export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x)
