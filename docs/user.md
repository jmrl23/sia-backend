# Controller: user

User related actions

## Endponts

- [/session](#session)
- [/create](#create)
- [/update](#update)
- [/list](#list)

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

fetch('http://sia-backend.serveo.net/user/session', requestOptions)
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
    "verified": false,
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

fetch('http://sia-backend.serveo.net/user/create', requestOptions)
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

fetch('http://sia-backend.serveo.net/user/update', requestOptions)
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
    "verified": false,
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

[UserListDto](<[UserCreateDto](https://github.com/jmrl23/sia-backend/tree/main/src/user/dto/user-list.dto.ts)>)

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

fetch('http://sia-backend.serveo.net/user/list', requestOptions)
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
      "verified": false,
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
      "verified": false,
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
      "verified": false,
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
