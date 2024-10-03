type Props = {
  placeholder: string;
  id: string;
  value: string;
  disabled: boolean;
  label: string;
  span: string;
  state: (val: string) => void;
  onChange: (value: string, setter: (val: string) => void) => void;

}

export const Input = ({ placeholder, id, value, disabled, state, label, span, onChange }: Props) => {


  return (
    <div className="w-full lg:w-auto">
      <label htmlFor={id} className=" text-sm block">
        {label}
      </label>
      <div className="flex">
        <input
          type="text"
          id={id}
          className="rounded-l p-1  w-full lg:w-auto bg-gray-100 border border-gray-500 focus:outline-none  focus:border-y-blue-500 focus:border-l-blue-500"
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={e => onChange(e.target.value, state)}
        />
        <span className="p-2 bg-gray-500 rounded-r flex-shrink-0">{span}</span>
      </div>
    </div>



  );
}