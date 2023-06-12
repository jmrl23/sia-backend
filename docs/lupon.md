# Controller: lupon

Lupon related actions

## Endponts

- [/case-fetch](#case-fetch)
- [/case-list](#case-list)
- [/case-create](#case-create)
- [/case-update](#case-update)

### case-fetch

Get case

[LuponCaseFetchDto](https://github.com/jmrl23/sia-backend/tree/main/src/lupon/dto/lupon-case-fetch.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({
  id: 'ec1a8e8c-0aa3-40de-a5a4-49b88a4f7c3a',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/lupon/case-fetch', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "case": {
    "id": "ec1a8e8c-0aa3-40de-a5a4-49b88a4f7c3a",
    "dateCreated": "2023-06-12T19:03:25.699Z",
    "dateUpdated": "2023-06-12T19:03:25.699Z",
    "caseNumber": 1,
    "title": "Mabahong headset",
    "respondentName": "Totoy Brown",
    "dateFiled": "2023-06-12T15:57:07.150Z",
    "dateOfConfrontation": null,
    "dateOfSettled": null,
    "remarks": "Hindi naliligo kaya nangangamoy mga headset sa computer shop",
    "mainPointOfAgreement": "Nang maiwasan ang pagbaho ng mga headset",
    "actionTaken": null,
    "status": "PENDING",
    "evidenceFileId": null,
    "userId": "878d8625-a284-426c-8b57-fcc33cb05990",
    "User": {
      "id": "878d8625-a284-426c-8b57-fcc33cb05990",
      "dateCreated": "2023-06-10T14:25:16.461Z",
      "dateUpdated": "2023-06-10T14:25:16.461Z",
      "residentNumber": 4,
      "enabled": true,
      "email": "johndoe@email.com",
      "password": "$2b$04$5GzumZ3cs1cApXWeFEMDvO9rOB46mMbWlr/vy093FSMWMfJGdQr36",
      "role": "ADMIN",
      "residentStatus": "ACTIVE",
      "userInformationId": "b136e926-e717-49c2-852d-8d437c8527ab",
      "UserInformation": {
        "id": "b136e926-e717-49c2-852d-8d437c8527ab",
        "dateCreated": "2023-06-10T14:25:16.461Z",
        "dateUpdated": "2023-06-10T14:25:16.461Z",
        "firstName": "john",
        "middleName": null,
        "lastName": "doe",
        "nameSuffix": null,
        "contactNumber": null,
        "dateOfBirth": "2001-06-10T00:00:00.000Z",
        "occupation": null,
        "precinctNumber": null,
        "emergencyContactPerson": null,
        "emergencyContactRelationship": null,
        "emergencyContactNumber": null,
        "streetAddress": "asdasd",
        "city": "hotdogan",
        "barangay": "North Signal Village",
        "sex": "MALE",
        "bloodType": null,
        "maritalStatus": "SINGLE",
        "pictureId": null,
        "Picture": null
      }
    }
  }
}
```

### case-list

Get list of cases

[LuponCaseListDto](https://github.com/jmrl23/sia-backend/tree/main/src/lupon/dto/lupon-case-list.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/lupon/case-list', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "cases": [
    {
      "id": "ec1a8e8c-0aa3-40de-a5a4-49b88a4f7c3a",
      "dateCreated": "2023-06-12T19:03:25.699Z",
      "dateUpdated": "2023-06-12T19:04:23.352Z",
      "caseNumber": 1,
      "title": "Mabahong headset",
      "respondentName": "Totoy Brown",
      "dateFiled": "2023-06-12T15:57:07.150Z",
      "dateOfConfrontation": null,
      "dateOfSettled": null,
      "remarks": "Hindi naliligo kaya nangangamoy mga headset sa computer shop",
      "mainPointOfAgreement": "Nang maiwasan ang pagbaho ng mga headset",
      "actionTaken": null,
      "status": "PENDING",
      "evidenceFileId": null,
      "userId": "878d8625-a284-426c-8b57-fcc33cb05990",
      "User": {
        "id": "878d8625-a284-426c-8b57-fcc33cb05990",
        "dateCreated": "2023-06-10T14:25:16.461Z",
        "dateUpdated": "2023-06-10T14:25:16.461Z",
        "residentNumber": 4,
        "enabled": true,
        "email": "johndoe@email.com",
        "password": "$2b$04$5GzumZ3cs1cApXWeFEMDvO9rOB46mMbWlr/vy093FSMWMfJGdQr36",
        "role": "ADMIN",
        "residentStatus": "ACTIVE",
        "userInformationId": "b136e926-e717-49c2-852d-8d437c8527ab",
        "UserInformation": {
          "id": "b136e926-e717-49c2-852d-8d437c8527ab",
          "dateCreated": "2023-06-10T14:25:16.461Z",
          "dateUpdated": "2023-06-10T14:25:16.461Z",
          "firstName": "john",
          "middleName": null,
          "lastName": "doe",
          "nameSuffix": null,
          "contactNumber": null,
          "dateOfBirth": "2001-06-10T00:00:00.000Z",
          "occupation": null,
          "precinctNumber": null,
          "emergencyContactPerson": null,
          "emergencyContactRelationship": null,
          "emergencyContactNumber": null,
          "streetAddress": "asdasd",
          "city": "hotdogan",
          "barangay": "North Signal Village",
          "sex": "MALE",
          "bloodType": null,
          "maritalStatus": "SINGLE",
          "pictureId": null,
          "Picture": null
        }
      }
    }
  ]
}
```

### case-create

Create new case

[LuponCaseCreateDto](https://github.com/jmrl23/sia-backend/tree/main/src/lupon/dto/lupon-case-create.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({
  title: 'kemene',
  complaintNature: 'xdd',
  statusOfCompliance: 'ewan',
  dateOfInitial: '2023-06-07T16:50:42.710Z',
  dateOfSettled: '2023-06-07T16:50:42.710Z',
  remarks: 'khkhkh',
  mainPointOfAgreement: 'wala',
  evidenceFileId: '1e5272d7-95f7-4f3a-a46c-9473c7c3e5f0',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/lupon/case-create', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "case": {
    "id": "a9c34525-a282-4ecd-9ef3-2492f4cbb74c",
    "dateCreated": "2023-06-07T16:54:47.181Z",
    "dateUpdated": "2023-06-07T16:54:47.181Z",
    "caseNumber": 2,
    "title": "kemene",
    "complaintNature": "xdd",
    "statusOfCompliance": "ewan",
    "dateOfInitial": "2023-06-07T16:50:42.710Z",
    "dateOfSettled": "2023-06-07T16:50:42.710Z",
    "remarks": "khkhkh",
    "mainPointOfAgreement": "wala",
    "evidenceFileId": "1e5272d7-95f7-4f3a-a46c-9473c7c3e5f0",
    "status": "PENDING",
    "userId": "02a9c606-e548-4f0b-9552-1289a2443245"
  }
}
```

### case-update

Update case

[LuponCaseUpdateDto](https://github.com/jmrl23/sia-backend/tree/main/src/lupon/dto/lupon-case-update.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3OGQ4NjI1LWEyODQtNDI2Yy04YjU3LWZjYzMzY2IwNTk5MCIsImlhdCI6MTY4NjU4ODExOCwiZXhwIjoxNjg2ODQ3MzE4fQ.OIVCHO58RyXeuzu9fB5PXB9cCL_7PJwhy1V1LLEiqI8',
);

var raw = JSON.stringify({
  id: 'ec1a8e8c-0aa3-40de-a5a4-49b88a4f7c3a',
  title: 'Updated title',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/lupon/case-update', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "case": {
    "id": "ec1a8e8c-0aa3-40de-a5a4-49b88a4f7c3a",
    "dateCreated": "2023-06-12T19:03:25.699Z",
    "dateUpdated": "2023-06-12T19:04:23.352Z",
    "caseNumber": 1,
    "title": "Updated title",
    "respondentName": "Totoy Brown",
    "dateFiled": "2023-06-12T15:57:07.150Z",
    "dateOfConfrontation": null,
    "dateOfSettled": null,
    "remarks": "Hindi naliligo kaya nangangamoy mga headset sa computer shop",
    "mainPointOfAgreement": "Nang maiwasan ang pagbaho ng mga headset",
    "actionTaken": null,
    "status": "PENDING",
    "evidenceFileId": null,
    "userId": "878d8625-a284-426c-8b57-fcc33cb05990",
    "User": {
      "id": "878d8625-a284-426c-8b57-fcc33cb05990",
      "dateCreated": "2023-06-10T14:25:16.461Z",
      "dateUpdated": "2023-06-10T14:25:16.461Z",
      "residentNumber": 4,
      "enabled": true,
      "email": "johndoe@email.com",
      "password": "$2b$04$5GzumZ3cs1cApXWeFEMDvO9rOB46mMbWlr/vy093FSMWMfJGdQr36",
      "role": "ADMIN",
      "residentStatus": "ACTIVE",
      "userInformationId": "b136e926-e717-49c2-852d-8d437c8527ab",
      "UserInformation": {
        "id": "b136e926-e717-49c2-852d-8d437c8527ab",
        "dateCreated": "2023-06-10T14:25:16.461Z",
        "dateUpdated": "2023-06-10T14:25:16.461Z",
        "firstName": "john",
        "middleName": null,
        "lastName": "doe",
        "nameSuffix": null,
        "contactNumber": null,
        "dateOfBirth": "2001-06-10T00:00:00.000Z",
        "occupation": null,
        "precinctNumber": null,
        "emergencyContactPerson": null,
        "emergencyContactRelationship": null,
        "emergencyContactNumber": null,
        "streetAddress": "asdasd",
        "city": "hotdogan",
        "barangay": "North Signal Village",
        "sex": "MALE",
        "bloodType": null,
        "maritalStatus": "SINGLE",
        "pictureId": null,
        "Picture": null
      }
    }
  }
}
```
