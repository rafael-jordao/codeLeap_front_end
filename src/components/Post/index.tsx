import GarbageIcon from '../../assets/lixo.svg';
import EditIcon from '../../assets/edit.svg';

import { PostContainer, Header, Content, ContentHeader, Icon, Name, CreatedAt, Paragraph } from './styles';

interface PostProps {
  title: string;
  name: string | null;
  createdAt: string;
  paragraph: string
  onDelete: () => void;
  onUpdate: () => void;
}

export default function Post({ title, name, createdAt, paragraph, onDelete, onUpdate }: PostProps) {
  return (
    <PostContainer>
      <Header>
        <h1>{title}</h1>
        <div>
          <Icon onClick={onDelete}>
            <img src={GarbageIcon} />
          </Icon>
          <Icon>
            <img onClick={onUpdate} src={EditIcon} />
          </Icon>
        </div>
      </Header>

      <Content>
        <ContentHeader>
          <Name>{name}</Name>
          <CreatedAt>{createdAt}</CreatedAt>
        </ContentHeader>

        <Paragraph>
          {paragraph}
        </Paragraph>
      </Content>
    </PostContainer>
  );
}
