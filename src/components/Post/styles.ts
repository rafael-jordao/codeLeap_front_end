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

export const PostContainer = styled.div`
  margin: 24px;
  animation: ${moveUpDown} .3s ease-out;
`;

export const Header = styled.div`
  background-color: #7695EC;
  display: flex;
  padding: 2rem;
  color: white;
  border-radius: 16px 16px 0px 0px;
  justify-content: space-between;
`;

export const Icon = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
`;

export const Content = styled.div`
  border: 1px solid #999999;
  border-radius: 0px 0px 16px 16px;
`;

export const ContentHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

export const Name = styled.h2`
  color: #777777;
`;

export const CreatedAt = styled.p`
  color: #777777;
  font-size: 1.8em;
`;

export const Paragraph = styled.p`
  color: black;
  font-size: 1.8em;
  line-height: 25px;
  padding: 0rem 2rem 0rem 2rem;
  margin-bottom: 2rem;
`;
