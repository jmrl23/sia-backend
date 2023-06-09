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
  id: '65879040-b96f-4729-bfe4-0dcabb7ad1af',
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
    "id": "65879040-b96f-4729-bfe4-0dcabb7ad1af",
    "dateCreated": "2023-06-09T05:46:39.731Z",
    "dateUpdated": "2023-06-09T05:46:39.731Z",
    "caseNumber": 2,
    "title": "kemene",
    "complaintNature": "xdd",
    "statusOfCompliance": "ewan",
    "dateOfInitial": "2023-06-07T16:50:42.710Z",
    "dateOfSettled": "2023-06-07T16:50:42.710Z",
    "remarks": "khkhkh",
    "mainPointOfAgreement": "wala",
    "evidenceFileId": "c823b19d-82c9-44b9-bba2-3f54dbc737ea",
    "status": "PENDING",
    "userId": "fa3b92c6-1118-4fba-836d-2ff1e36ccf0e",
    "User": {
      "id": "fa3b92c6-1118-4fba-836d-2ff1e36ccf0e",
      "dateCreated": "2023-06-08T11:52:16.014Z",
      "dateUpdated": "2023-06-08T12:39:40.833Z",
      "residentNumber": 1,
      "enabled": true,
      "email": "johndoe@email.com",
      "role": "ADMIN",
      "residentStatus": "ACTIVE",
      "userInformationId": "eea0b64a-1883-441d-8219-c4aa3b809676",
      "UserInformation": {
        "id": "eea0b64a-1883-441d-8219-c4aa3b809676",
        "dateCreated": "2023-06-08T11:52:16.014Z",
        "dateUpdated": "2023-06-08T11:52:16.014Z",
        "firstName": "john",
        "middleName": null,
        "lastName": "doe",
        "nameSuffix": null,
        "contactNumber": null,
        "dateOfBirth": "2001-08-22T16:00:00.000Z",
        "occupation": null,
        "precinctNumber": null,
        "emergencyContactPerson": null,
        "emergencyContactRelationship": null,
        "emergencyContactNumber": null,
        "streetAddress": "bahay namin",
        "city": "Taguig City",
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
      "id": "65879040-b96f-4729-bfe4-0dcabb7ad1af",
      "dateCreated": "2023-06-09T05:46:39.731Z",
      "dateUpdated": "2023-06-09T05:46:39.731Z",
      "caseNumber": 2,
      "title": "kemene",
      "complaintNature": "xdd",
      "statusOfCompliance": "ewan",
      "dateOfInitial": "2023-06-07T16:50:42.710Z",
      "dateOfSettled": "2023-06-07T16:50:42.710Z",
      "remarks": "khkhkh",
      "mainPointOfAgreement": "wala",
      "evidenceFileId": "c823b19d-82c9-44b9-bba2-3f54dbc737ea",
      "status": "PENDING",
      "userId": "fa3b92c6-1118-4fba-836d-2ff1e36ccf0e",
      "User": {
        "id": "fa3b92c6-1118-4fba-836d-2ff1e36ccf0e",
        "dateCreated": "2023-06-08T11:52:16.014Z",
        "dateUpdated": "2023-06-08T12:39:40.833Z",
        "residentNumber": 1,
        "enabled": true,
        "email": "johndoe@email.com",
        "role": "ADMIN",
        "residentStatus": "ACTIVE",
        "userInformationId": "eea0b64a-1883-441d-8219-c4aa3b809676",
        "UserInformation": {
          "id": "eea0b64a-1883-441d-8219-c4aa3b809676",
          "dateCreated": "2023-06-08T11:52:16.014Z",
          "dateUpdated": "2023-06-08T11:52:16.014Z",
          "firstName": "john",
          "middleName": null,
          "lastName": "doe",
          "nameSuffix": null,
          "contactNumber": null,
          "dateOfBirth": "2001-08-22T16:00:00.000Z",
          "occupation": null,
          "precinctNumber": null,
          "emergencyContactPerson": null,
          "emergencyContactRelationship": null,
          "emergencyContactNumber": null,
          "streetAddress": "bahay namin",
          "city": "Taguig City",
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
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({
  id: 'a9c34525-a282-4ecd-9ef3-2492f4cbb74c',
  status: 'DISMISSED',
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
    "id": "a9c34525-a282-4ecd-9ef3-2492f4cbb74c",
    "dateCreated": "2023-06-07T16:54:47.181Z",
    "dateUpdated": "2023-06-07T17:00:55.744Z",
    "caseNumber": 2,
    "title": "kemene",
    "complaintNature": "xdd",
    "statusOfCompliance": "ewan",
    "dateOfInitial": "2023-06-07T16:50:42.710Z",
    "dateOfSettled": "2023-06-07T16:50:42.710Z",
    "remarks": "khkhkh",
    "mainPointOfAgreement": "wala",
    "evidenceFileId": "1e5272d7-95f7-4f3a-a46c-9473c7c3e5f0",
    "status": "DISMISSED",
    "userId": "02a9c606-e548-4f0b-9552-1289a2443245"
  }
}
```
