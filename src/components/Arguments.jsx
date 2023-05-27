import { useContext } from "react";
import { Button, Input, Select } from "antd";
import AppContext from "../appContext";
import debounce from "lodash.debounce";
const { Option } = Select;

const Arguments = () => {
  const { state, setState } = useContext(AppContext);

  const onAdd = () => {
    const args = [...state.args, { label: "newArg", value: false }];
    setState({ ...state, args });
  };

  const onValueChange = (value, index) => {
    const args = state.args.slice(0);
    args[index] = { ...args[index], value };
    setState({ ...state, args });
  };

  const onLabelChange = (e, index) => {
    const label = e.target.value;
    const args = state.args.slice(0);
    args[index] = { ...args[index], label };
    setState({ ...state, args });
  };

  const debouncedChangeHandler = debounce(onLabelChange, 300);

  return (
    <div style={{ textAlign: "center" }}>
      {state.args.map((a, index) => {
        const selectAfter = (
          <Select
            defaultValue={a.value}
            onChange={(val) => onValueChange(val, index)}
          >
            <Option value={false}>false</Option>
            <Option value={true}>true</Option>
          </Select>
        );
        return (
          <Input
            key={`${index}-${a.label}`}
            addonAfter={selectAfter}
            defaultValue={a.label}
            onChange={(e) => debouncedChangeHandler(e, index)}
          />
        );
      })}

      <Button style={{ marginTop: "10px" }} onClick={onAdd}>
        + Add Arg
      </Button>
    </div>
  );
};

export default Arguments;
