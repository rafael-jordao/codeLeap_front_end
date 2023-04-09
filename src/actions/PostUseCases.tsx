import { formatDistanceToNow } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { PostProps } from '../@types/PostProps';

class PostUseCases {

  create({ title, name, paragraph }: Omit<PostProps, 'createdAt'>) {
    const createdAt = new Date();
    const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });

    const newPost = {
      id: uuidv4(),
      title,
      name,
      createdAt: formattedDate,
      paragraph,
    };

    if (name.length > 0 && title.length > 0) {
      return newPost;
    }
    return;
  }

  delete(id: string, feed: PostProps[]) {
    const index = feed.findIndex(post => post.id === id);

    if (index >= 0) {
      const updatedFeed = [...feed];
      updatedFeed.splice(index, 1);
      return updatedFeed;
    }

    return feed;
  }

  edit(id: string, { title, name, paragraph }: Omit<PostProps, 'createdAt'>, feed: PostProps[]): PostProps[] {

    const index = feed.findIndex(post => post.id === id);

    if (index >= 0) {
      const updatedPost = {
        ...feed[index],
        title,
        name,
        paragraph,
      };

      const updatedFeed = [...feed];
      updatedFeed[index] = updatedPost;

      return updatedFeed;
    }

    return feed;
  }
}

export default new PostUseCases();
