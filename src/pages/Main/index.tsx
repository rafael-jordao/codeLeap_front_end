import { Container, Header } from './styles';

import CreatePost from '../../components/CreatePost';
import Feed from '../../components/Feed';

export default function Main() {
  return (
    <Container>
      <Header>
        <h1>CodeLeap Network</h1>
      </Header>
      <CreatePost />
      <Feed />
    </Container>
  );
}
