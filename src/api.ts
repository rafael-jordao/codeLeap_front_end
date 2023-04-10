const url = 'https://dev.codeleap.co.uk';


export function POSTS_GET(limit: number) {
  return {
    url: url + `/careers/?limit=${limit}&offset=0`,
    options: {
      method: 'GET',
    },
  };
}

export function POSTS_POST(body: object) {
  return {
    url: url + '/careers/',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}


export function POST_DELETE(id?: number) {
  const postId = typeof id === 'number' ? id : 0;
  return {
    url: `${url}/careers/${postId}/`,
    options: {
      method: 'DELETE',
    },
  };
}

export function POST_PATCH(id: number, body: object) {
  return {
    url: `${url}/careers/${id}/`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}
