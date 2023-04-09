import styled, { keyframes } from 'styled-components';

const moveUpDown = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Overlay = styled.div`
    left: 0px;
    top: 0px;
    background: rgba(119, 119, 119, 0.8);
    backdrop-filter: blur(4.5px);
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease-in-out;
`;

export const ModalBody = styled.div`
    background-color: #fff;
    width: 100%;
    max-width: 660px;
    min-height: 146px;
    border: 1px solid #999999;
    border-radius: 16px;
    animation: ${moveUpDown} .3s ease-out;
`;

export const FormContainer = styled.div`
  border-radius: 16px;
  margin: 24px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  float: right;
  gap: 1rem;
  padding: 0px 22px 22px 0px;
`;


