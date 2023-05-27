export const getResult = ({ args, expressions }) => {
  const revExpressions = expressions.slice(0).reverse();
  const result = revExpressions.reduce((acc, exp, index) => {
    const nextOp =
      revExpressions.length != index + 1
        ? revExpressions[index + 1].slice(0).reverse()[0].type
        : undefined;
    const currentOpPresent = exp.some((e) => ["or", "and"].includes(e.type));
    const newExp = currentOpPresent ? exp.slice(0, -1) : exp;
    const tempResult = newExp.reduce((a, e) => {
      let value = e.value;
      if (e.type === "args") {
        value = args.find((a) => a.label === e.value)?.value;
      }
      if (a === undefined) return value;
      if (nextOp === "and") return a && value;
      if (nextOp === "or") return a || value;
      return value;
    }, acc);
    return tempResult;
  }, undefined);

  return `${result}`;
};

/*
[
    [
        {
            "type": "args",
            "value": "newArg"
        },
        {
            "type": "constant",
            "value": false
        }
    ],
    [
        {
            "type": "constant",
            "value": false
        },
        {
            "type": "args",
            "value": "myArg"
        },
        {
            "type": "or",
            "value": "or"
        }
    ],
    [
        {
            "type": "and",
            "value": "and"
        }
    ]
]
*/
