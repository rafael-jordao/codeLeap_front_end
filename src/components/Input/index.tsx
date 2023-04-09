import { InputContainer, Label, Container } from './styles';

type InputProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ label, type, name, value, onChange, placeholder }: InputProps) {

  return (
    <Container>
      <Label>{label}</Label>
      <InputContainer
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </Container>
  );
}
