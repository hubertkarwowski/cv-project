import type { ControllerFieldState } from 'react-hook-form';

import { FieldError } from './ui/field';

interface Props {
  fieldState: ControllerFieldState;
}
export const DisplayErrorForm = ({ fieldState }: Props) => {
  return fieldState.invalid && <FieldError errors={[fieldState.error]} />;
};
