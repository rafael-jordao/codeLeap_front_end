import { ButtonContainer } from './styles';

interface Button {
  children: string;
  disabled?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  border?: string;
  color?: string
}

export function Button({ onClick, children, disabled, backgroundColor, border, color }: Button) {
  return <ButtonContainer
    style={{ backgroundColor: backgroundColor, border: border, color: color }}
    onClick={onClick}
    disabled={disabled}>
    {children}
  </ButtonContainer>;
}
