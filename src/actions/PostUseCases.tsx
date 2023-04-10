import { PostProps } from '../@types/PostProps';

import { POSTS_GET, POSTS_POST, POST_DELETE, POST_PATCH } from '../api';


class PostUseCases {

  async index(limit: number) {
    const { url, options } = POSTS_GET(limit);
    const response = await fetch(url, options);
    const json = await response.json();

    return json;
  }

  async create({ username, title, content }: PostProps) {
    const newPost = {
      username,
      title,
      content,
    };

    const { url, options } = POSTS_POST(newPost);

    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  }

  async delete(id: number) {
    const { url, options } = POST_DELETE(id);
    const response = await fetch(url, options);

    return response.status;
  }

  async edit(id: number, { title, content }: PostProps) {
    const editedPost = {
      title,
      content,
    };

    const { url, options } = POST_PATCH(id, editedPost);

    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  }
}

export default new PostUseCases();
