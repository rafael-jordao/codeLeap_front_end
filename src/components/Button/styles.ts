import styled from 'styled-components';

export const ButtonContainer = styled.button`
  background: #7695EC;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  color: white;
  cursor: pointer;
  padding: .5rem;
  margin-top: 1rem;
  min-width: 111px;
  transition: .2s ease-in-out;
  align-self: flex-end;

  &:hover {
    scale: 105%;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
