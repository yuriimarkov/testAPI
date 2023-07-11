async function logData() {
  const url = 'https://ridni.azurewebsites.net/Auth/GetAllUsers';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Ошибка при выполнении запроса:', response.status);
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

async function addUser(user) {
  const url = 'https://ridni.azurewebsites.net/Auth/Register';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log('Пользователь успешно добавлен');
      fetchDataAndDisplayUsers();
    } else {
      console.error('Ошибка при выполнении запроса:', response.status);
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

const userList = document.querySelector('.userList');
async function viewUsers(data) {
  const body = document.querySelector('.allUsersContainer');

  data.map(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('listItem');
    listItem.innerHTML = item;
    userList.append(listItem);
  });

  body.append(userList);
}

function handleAddUser(event) {
  event.preventDefault();

  const nameInput = document.querySelector('.nameInput');
  const usernameInput = document.querySelector('.usernameInput');
  const passwordInput = document.querySelector('.passwordInput');
  const roleInput = document.querySelector('.roleInput');

  const user = {
    name: nameInput.value,
    userName: usernameInput.value,
    password: passwordInput.value,
    role: roleInput.value,
  };

  addUser(user);
  userList.innerHTML = '';
  nameInput.value = '';
  usernameInput.value = '';
  passwordInput.value = '';
  roleInput.value = '';
}

async function fetchDataAndDisplayUsers() {
  try {
    const data = await logData();
    viewUsers(data);
  } catch (error) {
    console.error('Произошла ошибка при получении данных:', error);
  }
}

fetchDataAndDisplayUsers();

const addUserButton = document.querySelector('.addUserButton');
addUserButton.addEventListener('click', handleAddUser);
