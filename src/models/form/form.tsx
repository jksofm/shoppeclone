/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldValues, Path } from 'react-hook-form'

export interface FormAuthPayload {
  email: string
  password: string
  confirm_password: string
}

export type InputFieldProps<T extends FieldValues> = {
  type: React.HTMLInputTypeAttribute
  name: Path<T>
  placeholder: string
  control: Control<T>
  className?: string
  // errorMessage?: string
  // onChange: any
  // onBlur: any
  // ref: any
}
