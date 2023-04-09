import { Label, Container, TextareaContainer } from './styles';

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export default function TextArea({ label, name, value, onChange, placeholder }: TextAreaProps) {

  return (
    <Container>
      <Label>{label}</Label>
      <TextareaContainer
        onChange={onChange}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
      />
    </Container>
  );
}
