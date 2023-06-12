# Controller: user

User related actions

## Endponts

- [/session](#session)
- [/create](#create)
- [/sign-in](#sign-in)
- [/fetch](#fetch)
- [/update](#update)
- [/list](#list)
- [/reset-password](#reset-password)

### session

Get current user's data

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer <token>');

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/user/session', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "user": {
    "id": "52c5f18d-54b4-42d2-a39c-8c28d9b9f568",
    "dateCreated": "2023-04-29T21:41:27.298Z",
    "dateUpdated": "2023-04-29T21:41:27.298Z",
    "residentNumber": 2,
    "enabled": true,
    "email": "jojogaitera@gmail.com",
    "role": "ADMIN",
    "residentStatus": "ACTIVE",
    "UserInformation": {
      "id": "f8985e8e-6ed5-4476-a451-77af836d62bc",
      "dateCreated": "2023-04-29T21:41:27.298Z",
      "dateUpdated": "2023-04-29T21:41:27.298Z",
      "firstName": "Jomariel",
      "middleName": null,
      "lastName": "Gaitera",
      "nameSuffix": null,
      "address": "bahay namin",
      "contactNumber": null,
      "dateOfBirth": "2001-08-22T16:00:00.000Z",
      "occupation": null,
      "precinctNumber": null,
      "emergencyContactPerson": null,
      "sex": "MALE",
      "bloodType": null,
      "maritalStatus": "SINGLE",
      "userId": "52c5f18d-54b4-42d2-a39c-8c28d9b9f568",
      "pictureId": null
    }
  }
}
```

### create

Create new user

[UserCreateDto](https://github.com/jmrl23/sia-backend/tree/main/src/user/dto/user-create.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

var raw = JSON.stringify({
  email: 'jojogaitera2@gmail.com',
  password: 'abcd1234',
  firstName: 'Jomariel',
  lastName: 'Gaitera',
  address: 'bahay namin',
  dateOfBirth: '2001-08-22T16:00:00.000Z',
  role: 'ADMIN',
  sex: 'MALE',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/user/create', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwOWU5OWUzLTgyOTUtNDA0Mi05YTg1LTA1OWFjYTQzY2YyZSIsImlhdCI6MTY4MjgyOTkxNCwiZXhwIjoxNjgzMDg5MTE0fQ.NWf5E9nQbKVbNaBCPITLxHT6XuN2Ob3ClbOz0GA2eKU"
}
```

### sign-in

User sign-in

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwMWNhNTU1LTdlNDEtNGU1ZS1hNzc5LTA5ZWNlN2JkMGVhMCIsImlhdCI6MTY4NjIyNjc2NiwiZXhwIjoxNjg2NDg1OTY2fQ.WdjEY-ieB5FJIvT6J2V8pDuJMNxyWUP72Y1IKVAsjy8',
);

var raw = JSON.stringify({
  email: 'johndoe@email.com',
  password: 'hotdog1234',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/user/sign-in', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3OGQ4NjI1LWEyODQtNDI2Yy04YjU3LWZjYzMzY2IwNTk5MCIsImlhdCI6MTY4NjU4ODExOCwiZXhwIjoxNjg2ODQ3MzE4fQ.OIVCHO58RyXeuzu9fB5PXB9cCL_7PJwhy1V1LLEiqI8"
}
```

### fetch

Get user's data

[UserFetchDto](https://github.com/jmrl23/sia-backend/tree/main/src/user/dto/user-fetch.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({
  email: 'connor@gmail.com',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/user/fetch', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "user": {
    "id": "2b82fb47-2318-4e6b-aff9-39a09b08f848",
    "dateCreated": "2023-05-03T14:55:23.148Z",
    "dateUpdated": "2023-05-03T14:55:23.148Z",
    "residentNumber": 15,
    "enabled": true,
    "email": "connor@gmail.com",
    "role": "ADMIN",
    "residentStatus": "ACTIVE",
    "UserInformation": {
      "id": "67d09670-74cb-40e7-82e5-026fb91d5ed2",
      "dateCreated": "2023-05-03T14:55:23.148Z",
      "dateUpdated": "2023-05-03T14:55:23.148Z",
      "firstName": "Connor",
      "middleName": null,
      "lastName": "Ball",
      "nameSuffix": null,
      "address": "Taguig City",
      "contactNumber": null,
      "dateOfBirth": "2023-05-03T00:00:00.000Z",
      "occupation": null,
      "precinctNumber": null,
      "emergencyContactPerson": null,
      "sex": "MALE",
      "bloodType": null,
      "maritalStatus": "SINGLE",
      "userId": "2b82fb47-2318-4e6b-aff9-39a09b08f848",
      "pictureId": null
    }
  }
}
```

### update

Update user's data

[UserUpdateDto](https://github.com/jmrl23/sia-backend/tree/main/src/user/dto/user-update.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({
  id: '52c5f18d-54b4-42d2-a39c-8c28d9b9f568',
  firstName: 'Master',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/user/update', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "user": {
    "id": "52c5f18d-54b4-42d2-a39c-8c28d9b9f568",
    "dateCreated": "2023-04-29T21:41:27.298Z",
    "dateUpdated": "2023-04-29T21:41:27.298Z",
    "residentNumber": 2,
    "enabled": true,
    "email": "jojogaitera@gmail.com",
    "role": "ADMIN",
    "residentStatus": "ACTIVE",
    "UserInformation": {
      "id": "f8985e8e-6ed5-4476-a451-77af836d62bc",
      "dateCreated": "2023-04-29T21:41:27.298Z",
      "dateUpdated": "2023-04-30T04:55:28.540Z",
      "firstName": "Master",
      "middleName": null,
      "lastName": "Gaitera",
      "nameSuffix": null,
      "address": "bahay namin",
      "contactNumber": null,
      "dateOfBirth": "2001-08-22T16:00:00.000Z",
      "occupation": null,
      "precinctNumber": null,
      "emergencyContactPerson": null,
      "sex": "MALE",
      "bloodType": null,
      "maritalStatus": "SINGLE",
      "userId": "52c5f18d-54b4-42d2-a39c-8c28d9b9f568",
      "pictureId": null
    }
  }
}
```

### list

Fetch list of users

[UserListDto](https://github.com/jmrl23/sia-backend/tree/main/src/user/dto/user-list.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({
  role: ['ADMIN', 'RESIDENT'],
  enabled: true,
  take: 10,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/user/list', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "users": [
    {
      "id": "e09e99e3-8295-4042-9a85-059aca43cf2e",
      "dateCreated": "2023-04-30T04:45:13.765Z",
      "dateUpdated": "2023-04-30T04:45:13.765Z",
      "residentNumber": 3,
      "enabled": true,
      "email": "jojogaitera2@gmail.com",
      "role": "ADMIN",
      "residentStatus": "ACTIVE",
      "UserInformation": {
        "id": "49adf72b-192f-405e-a0fa-60319b643fc8",
        "dateCreated": "2023-04-30T04:45:13.765Z",
        "dateUpdated": "2023-04-30T04:45:13.765Z",
        "firstName": "Jomariel",
        "middleName": null,
        "lastName": "Gaitera",
        "nameSuffix": null,
        "address": "bahay namin",
        "contactNumber": null,
        "dateOfBirth": "2001-08-22T16:00:00.000Z",
        "occupation": null,
        "precinctNumber": null,
        "emergencyContactPerson": null,
        "sex": "MALE",
        "bloodType": null,
        "maritalStatus": "SINGLE",
        "userId": "e09e99e3-8295-4042-9a85-059aca43cf2e",
        "pictureId": null
      }
    },
    {
      "id": "52c5f18d-54b4-42d2-a39c-8c28d9b9f568",
      "dateCreated": "2023-04-29T21:41:27.298Z",
      "dateUpdated": "2023-04-29T21:41:27.298Z",
      "residentNumber": 2,
      "enabled": true,
      "email": "jojogaitera@gmail.com",
      "role": "ADMIN",
      "residentStatus": "ACTIVE",
      "UserInformation": {
        "id": "f8985e8e-6ed5-4476-a451-77af836d62bc",
        "dateCreated": "2023-04-29T21:41:27.298Z",
        "dateUpdated": "2023-04-30T04:55:28.540Z",
        "firstName": "Master",
        "middleName": null,
        "lastName": "Gaitera",
        "nameSuffix": null,
        "address": "bahay namin",
        "contactNumber": null,
        "dateOfBirth": "2001-08-22T16:00:00.000Z",
        "occupation": null,
        "precinctNumber": null,
        "emergencyContactPerson": null,
        "sex": "MALE",
        "bloodType": null,
        "maritalStatus": "SINGLE",
        "userId": "52c5f18d-54b4-42d2-a39c-8c28d9b9f568",
        "pictureId": null
      }
    },
    {
      "id": "37e3105d-0da5-43e1-9379-2b7aa7bfe36b",
      "dateCreated": "2023-04-29T21:39:39.906Z",
      "dateUpdated": "2023-04-29T21:39:39.906Z",
      "residentNumber": 1,
      "enabled": true,
      "email": "jojogaitera1@gmail.com",
      "role": "ADMIN",
      "residentStatus": "ACTIVE",
      "UserInformation": {
        "id": "9badcdf6-317d-4ccc-a639-02442b0f6c1e",
        "dateCreated": "2023-04-29T21:39:39.906Z",
        "dateUpdated": "2023-04-29T21:39:39.906Z",
        "firstName": "Jomariel",
        "middleName": null,
        "lastName": "Gaitera",
        "nameSuffix": null,
        "address": "bahay namin",
        "contactNumber": null,
        "dateOfBirth": "2001-08-22T16:00:00.000Z",
        "occupation": null,
        "precinctNumber": null,
        "emergencyContactPerson": null,
        "sex": "MALE",
        "bloodType": null,
        "maritalStatus": "SINGLE",
        "userId": "37e3105d-0da5-43e1-9379-2b7aa7bfe36b",
        "pictureId": null
      }
    }
  ]
}
```

### reset-password

Request for account reset password

[UserResetPasswordDto](https://github.com/jmrl23/sia-backend/tree/main/src/user/dto/user-reset-password.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

var raw = JSON.stringify({
  email: 'jojogaitera@gmail.com',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/user/reset-password', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "success": true
}
```
