import { InputFieldProps } from 'src/models/form/form'
import { ChangeEvent } from 'react'
import { useController, FieldValues } from 'react-hook-form'
export function InputField<T extends FieldValues>({
  type,
  name,
  placeholder,
  control, // onChange : externalOnChange,
  className // onBlur: externalOnBlur,
  // ref : externalRef,
}: InputFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control
  })
  return (
    <div className='mt-2'>
      <input
        type={type}
        name={name}
        value={value}
        ref={ref}
        onBlur={onBlur}
        autoComplete='on'
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(event)
        }}
        className={`p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm ${className}`}
        placeholder={placeholder}
      />
      <div className='mt-1 text-red-600 text-sm min-h-[1rem]'>{error?.message}</div>
    </div>
  )
}
