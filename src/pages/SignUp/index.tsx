import { useState } from 'react';

import { FormEvent, ChangeEvent } from 'react';

import Input from '../../components/Input';
import { Button } from '../../components/Button';

import { Wrapper, Container, Form } from './styles';

import { useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    setName(input);

    if (input.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.setItem('user', name);
    navigate('/feed');
  }

  return (
    <Container>
      <Wrapper>
        <h1>Welcome to CodeLeap network!</h1>
        <Form onSubmit={signUp}>
          <Input
            label="Please enter your username"
            type="name"
            name="name"
            onChange={handleChange}
            value={name}
            placeholder='John Doe'
          />
          <Button disabled={disabled}>ENTER</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}
