import { useContext } from "react";
import { Select, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import AppContext from "../appContext";

const optionTypes = [
  { value: "constant", label: "constant" },
  { value: "args", label: "args" },
  { value: "and", label: "and" },
  { value: "or", label: "or" },
];

const operations = ["or", "and"];

const Expression = () => {
  const { state, setState } = useContext(AppContext);

  const onTypeChange = (type, i, index) => {
    const expressions = state.expressions.slice(0);
    // const opsPresent = expressions[index].find((exp) => operations.includes(exp.type))
    const opPresent = operations.includes(type);
    expressions[index][i] = {
      ...expressions[index][i],
      type,
      value: opPresent ? type : "",
    };
    if (opPresent) {
      expressions.push([
        { type: "", value: "" },
        { type: "", value: "" },
      ]);
    }
    setState({ ...state, expressions });
  };

  const onValueChange = (value, i, index) => {
    const expressions = state.expressions.slice(0);
    const opPresent = operations.includes(expressions[index][i].type);
    let update = { value };
    if (opPresent) update = { ...update, type: value };
    expressions[index][i] = { ...expressions[index][i], ...update };
    setState({ ...state, expressions });
  };

  const getTypeOptions = (i, total) => {
    if (total - 1 === i) {
      return optionTypes;
    }
    return optionTypes.filter((ot) => !operations.includes(ot.value));
  };

  const getValueOptions = (type) => {
    let options = [];
    if (type === "constant") options = [false, true];
    if (operations.includes(type)) options = operations;
    if (type === "args") {
      options = state.args.map((a) => a.label);
    }
    return options.map((op) => {
      return { value: op, label: `${op}` };
    });
  };

  const onAddOp = () => {
    let expressions = state.expressions.slice(0);
    if (expressions.length > 0) {
      expressions[expressions.length - 1].push({ type: "", value: "" });
    } else {
      expressions = [[{ type: "", value: "" }]];
    }
    setState({ ...state, expressions });
  };

  const onDeleteOp = (i, index) => {
    let expressions = state.expressions.slice(0);
    const opPresent = operations.includes(expressions[index][i].type);
    expressions[index] = expressions[index].filter(
      (_, exp_index) => exp_index != i
    );
    if (opPresent) {
      expressions = expressions.filter((_, exp_index) => exp_index <= index);
    }
    if (expressions[index].length === 0) {
      expressions = expressions.filter((_, exp_index) => exp_index != index);
    }
    setState({ ...state, expressions });
  };

  return (
    <div style={{ marginTop: "50px" }}>
      {state.expressions.map((expression, index) => {
        return expression.map((exp, i) => {
          return (
            <div key={`${index}-${i}-${exp.type}`}>
              {exp.type == "" ? (
                <Select
                  defaultValue=""
                  style={{ width: 120, marginLeft: 10 + index * 10 }}
                  allowClear
                  value={exp.type}
                  options={getTypeOptions(i, expression.length)}
                  placeholder="select..."
                  onChange={(type) => onTypeChange(type, i, index)}
                />
              ) : (
                <Select
                  defaultValue={exp.value}
                  style={{ width: 120, marginLeft: 10 + index * 10 }}
                  allowClear
                  value={exp.value}
                  options={getValueOptions(exp.type)}
                  placeholder="select..."
                  onChange={(value) => onValueChange(value, i, index)}
                />
              )}
              <Button
                style={{ marginLeft: "5px" }}
                size="small"
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => onDeleteOp(i, index)}
              />
            </div>
          );
        });
      })}
      {state.expressions.length != 1 && (
        <div>
          <Button
            style={{
              width: 120,
              marginLeft: 10 + (state.expressions.length - 1) * 10,
            }}
            onClick={onAddOp}
          >
            Add op
          </Button>
        </div>
      )}
    </div>
  );
};

export default Expression;
