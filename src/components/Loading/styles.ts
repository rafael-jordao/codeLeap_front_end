import styled, { keyframes } from 'styled-components';

const spinner = keyframes`
   to {
        transform: rotate(1turn);
    }
`;

export const LoadingContainer = styled.div`
    border-radius: 50%;
    border: 5px solid;
    border-color: #dbdcef;
    border-right-color: #7695EC;
    animation: ${spinner} 1s infinite linear;
    margin: 0 auto;
    cursor:progress;
    width: 50px;
    height: 50px;
`;
