import { useState, useEffect } from 'react';
import Post from '../Post';
import Loading from '../Loading';

import { PostProps } from '../../@types/PostProps';

import PostUseCases from '../../actions/PostUseCases';

import DeleteModal from '../DeleteModal';
import EditModal from '../EditModal';

export default function Feed() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModaelVisible, setIsUpdateModalVisible] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState<number>();
  const [feed, setFeed] = useState<PostProps[]>([]);

  const [newTitle, setNewTitle] = useState('');
  const [newParagraph, setNewParagraph] = useState('');

  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const username = localStorage.getItem('user') || '';

  useEffect(() => {
    let wait = false;

    const infiniteScroll = () => {
      if (hasMore) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;

        if (scroll > height * .75 && !wait) {
          setLimit((prevLimit) => prevLimit + 10);

          wait = true;
          setTimeout(() => {
            wait = false;
          }, 1000);
        }
      }
    };

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);

    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };

  }, [hasMore]);

  useEffect(() => {
    listAllPosts();
  }, [limit]);

  async function listAllPosts() {
    const data = await PostUseCases.index(limit);
    setFeed(data.results);
    setLoading(false);

    if (data.results.length < limit) {
      setHasMore(false);
    }
  }

  function openDeleteModal(id: number) {
    setSelectedPostId(id);
    setIsDeleteModalVisible(true);
  }

  function openUpdateModal(id: number) {
    setSelectedPostId(id);
    setIsUpdateModalVisible(true);
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
    <>
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
    </>
  );
}
