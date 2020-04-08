module.exports = {
  plain: {
    color: "rgb(191, 199, 213)",
    backgroundColor: "rgb(41, 45, 62)"
  },
  styles: [
    {
      types: ["variable", "constant"],
      style: {color: "rgb(189, 147, 249)"}
    },
    {
      types: ["punctuation", "symbol"],
      style: {color: "rgb(191, 199, 213)"}
    },
    {
      types: ["string", "char", "tag", "selector"],
      style: {color: "rgb(116, 168, 105)"}
    },
    {
      types: ["keyword"],
      style: {color: "rgb(216, 128, 11)"}
    },
    {
      types: ["comment"],
      style: {color: "rgb(98, 114, 164)"}
    },

    {
      types: ["attr-name"],
      style: {color: "rgb(241, 250, 140)"}
    },
    {
      types: ["prolog", "builtin"],
      style: {color: "rgb(189, 147, 249)"}
    },
    {
      types: ["inserted", "function"],
      style: {color: "rgb(130, 170, 255)"}
    },
    {
      types: ["deleted"],
      style: {color: "rgb(255, 85, 85)"}
    },
    {
      types: ["changed"],
      style: {color: "rgb(255, 184, 108)"}
    },
  ]
};
