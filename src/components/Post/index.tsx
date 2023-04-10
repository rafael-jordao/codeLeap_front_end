import GarbageIcon from '../../assets/lixo.svg';
import EditIcon from '../../assets/edit.svg';

import { PostContainer, Header, Content, ContentHeader, Icon, Name, CreatedAt, Paragraph } from './styles';

import { formatDistanceToNow } from 'date-fns';

interface PostProps {
  title: string;
  name: string | null;
  created_datetime: Date;
  content: string
  onDelete: () => void;
  onUpdate: () => void;
}

export default function Post({ title, name, created_datetime, content, onDelete, onUpdate }: PostProps) {

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
          <CreatedAt>{formatDistanceToNow(new Date(created_datetime))} ago</CreatedAt>
        </ContentHeader>

        <Paragraph>
          {content}
        </Paragraph>
      </Content>
    </PostContainer>
  );
}
