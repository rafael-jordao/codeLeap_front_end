import { useState, FormEvent } from 'react';

import { FormContainer, Form } from './styles';
import Input from '../Input';
import TextArea from '../Textarea';
import { Button } from '../Button';

import { PostProps } from '../../@types/PostProps';

import PostUseCases from '../../actions/PostUseCases';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [feed, setFeed] = useState<PostProps[]>([]);
  const username = localStorage.getItem('user') || '';

  async function createPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newPost = await PostUseCases.create({ username, title, content });

    setFeed([...feed, newPost]);
    setContent('');
    setTitle('');
    setDisabled(false);
  }

  return (
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
  );
}
