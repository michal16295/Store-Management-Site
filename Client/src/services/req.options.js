export function postRequest(arg) {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const object = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    },
    body: JSON.stringify(arg)
  };
  return object;
}

export function getRequest() {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const object = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  };
  return object;
}

export function putRequest(arg) {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const object = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    },
    body: JSON.stringify(arg)
  };
  return object;
}

export function deleteRequest() {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const object = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  };
  return object;
}
