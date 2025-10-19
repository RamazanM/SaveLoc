import OutlinedInput from "@mui/material/OutlinedInput";

type EditableTextProps = {
  edit: Boolean;
  value: string;
  className: string;
  onChange: (text: string) => any;
};
function EditableText(props: EditableTextProps) {
  if (props.edit)
    return (
      <OutlinedInput
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    );
  else return <h1 className={props.className}>{props.value}</h1>;
}

export default EditableText;
