import { FormEvent, useEffect, useState } from 'react';

import { Container, Header, FormContainer, Form } from './styles';

import Input from '../../components/Input';
import TextArea from '../../components/Textarea';
import { Button } from '../../components/Button';
import Post from '../../components/Post';
import DeleteModal from '../../components/DeleteModal';
import EditModal from '../../components/EditModal';
import Loading from '../../components/Loading';

import PostUseCases from '../../actions/PostUseCases';
import { PostProps } from '../../@types/PostProps';

export default function Main() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [disabled, setDisabled] = useState(true);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModaelVisible, setIsUpdateModalVisible] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState<number>();

  const [feed, setFeed] = useState<PostProps[]>([]);

  const [newTitle, setNewTitle] = useState('');

  const [newParagraph, setNewParagraph] = useState('');

  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem('user') || '';

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // load more content
    }
  }

  useEffect(() => {
    async function listAllPosts() {
      const data = await PostUseCases.index();
      setFeed(data.results);
      setLoading(false);
    }

    listAllPosts();
  }, [PostUseCases.index()]);

  function openDeleteModal(id: number) {
    setSelectedPostId(id);
    setIsDeleteModalVisible(true);
  }

  function openUpdateModal(id: number) {
    setSelectedPostId(id);
    setIsUpdateModalVisible(true);
  }

  async function createPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newPost = await PostUseCases.create({ username, title, content });

    setFeed([...feed, newPost]);
    setContent('');
    setTitle('');
    setDisabled(false);
  }

  async function deletePost(id: number) {
    await PostUseCases.delete(id);
    setIsDeleteModalVisible(false);
  }

  async function editPost(id: number, newTitle: string, newContent: string) {
    await PostUseCases.edit(id, {
      username: username,
      title: newTitle,
      content: newContent,
    });

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
              setContent(target.value);
              if (target.value.length > 0) {
                setDisabled(false);
              } else {
                setDisabled(true);
              }
            }}
            value={content}
            placeholder='Content here' />
          <Button disabled={disabled}>CREATE</Button>
        </Form>
      </FormContainer>

      {loading ? (
        <Loading />
      ) : (
        feed.map((post) => {
          return (
            <Post
              key={post.id}
              title={post.title}
              name={post.username}
              content={post.content}
              created_datetime={post.created_datetime ?? new Date()}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onDelete={() => openDeleteModal(post.id!)}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onUpdate={() => openUpdateModal(post.id!)}
            />
          );
        })
      )}

      <DeleteModal
        onConfirm={() => {
          if (selectedPostId != undefined) {
            deletePost(selectedPostId);
          }
        }}
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
      />

      <EditModal
        onConfirm={() => {
          if (selectedPostId != undefined) {
            editPost(selectedPostId, newTitle, newParagraph);
          }
        }}
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
