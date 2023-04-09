import { FormEvent, useState } from 'react';

import { Container, Header, FormContainer, Form } from './styles';

import Input from '../../components/Input';
import TextArea from '../../components/Textarea';
import { Button } from '../../components/Button';
import Post from '../../components/Post';
import DeleteModal from '../../components/DeleteModal';
import EditModal from '../../components/EditModal';

import PostUseCases from '../../actions/PostUseCases';
import { PostProps } from '../../@types/PostProps';


export default function Main() {
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');

  const [disabled, setDisabled] = useState(true);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModaelVisible, setIsUpdateModalVisible] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState<string>('');

  const [feed, setFeed] = useState<PostProps[]>([]);

  const [newTitle, setNewTitle] = useState('');

  const [newParagraph, setNewParagraph] = useState('');

  const name = localStorage.getItem('user') || '';

  function openDeleteModal(id: string) {
    setSelectedPostId(id);
    setIsDeleteModalVisible(true);
  }

  function openUpdateModal(id: string) {
    setSelectedPostId(id);
    setIsUpdateModalVisible(true);
  }

  function createPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newPost = PostUseCases.create({ title, name, paragraph });

    if (newPost) {
      setFeed([...feed, newPost]);
      setParagraph('');
      setTitle('');
      setDisabled(false);
    }
    return;
  }

  function deletePost(id: string) {

    if (!id) {
      return;
    }
    const updatedFeed = PostUseCases.delete(id, feed);

    if (updatedFeed !== feed) {
      setFeed(updatedFeed);
    }

    setIsDeleteModalVisible(false);
  }


  function editPost(id: string, newTitle: string, newParagraph: string) {
    const updatePost = PostUseCases.edit(id, {
      title: newTitle,
      name: name,
      paragraph: newParagraph
    }, feed);

    setFeed(updatePost);
    setIsUpdateModalVisible(false);

    setNewTitle('');
    setNewParagraph('');
  }

  return (
    <Container>
      <Header>
        <h1>CodeLeap Network</h1>
      </Header>

      <FormContainer>
        <h1>What's on your mind?</h1>
        <Form onSubmit={createPost}>
          <Input
            label="Title"
            type="name"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            value={title}
            placeholder='John Doe'
          />
          <TextArea
            label="Content"
            name="content"
            onChange={({ target }) => {
              setParagraph(target.value);
              if (target.value.length > 0) {
                setDisabled(false);
              } else {
                setDisabled(true);
              }
            }}
            value={paragraph}
            placeholder='Content here' />
          <Button disabled={disabled}>CREATE</Button>
        </Form>
      </FormContainer>

      {feed.slice().reverse().map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            name={post.name}
            paragraph={post.paragraph}
            createdAt={post.createdAt}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onDelete={() => openDeleteModal(post.id!)}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onUpdate={() => openUpdateModal(post.id!)}
          />
        );
      })}

      <DeleteModal
        onConfirm={() => deletePost(selectedPostId)}
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
      />

      <EditModal
        onConfirm={() => editPost(selectedPostId, newTitle, newParagraph)}
        visible={isUpdateModaelVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        onChangeTitle={({ target }) => setNewTitle(target.value)}
        onChangeParagraph={({ target }) => setNewParagraph(target.value)}
        newParagraph={newParagraph}
        newTitle={newTitle}
      />
    </Container>
  );

}
