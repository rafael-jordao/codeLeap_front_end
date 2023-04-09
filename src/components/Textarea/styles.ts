import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1rem;
`;

export const Label = styled.label`
  font-weight: 400;
  font-size: 1.6em;
  line-height: 19px;
`;

export const TextareaContainer = styled.textarea`
  width: 100%;
  border: 1px solid #777777;
  border-radius: 8px;
  padding: .5rem;
  margin-top: 8px;
  min-height: 74px;
  transition: .2s ease-in-out;
  resize: none;

  &:focus {
    outline: none;
    border-color: #7695EC;
    background: white;
    box-shadow: 0 0 0 1.5px #7695EC;
  }
`;


