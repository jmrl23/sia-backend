# Controller: lupon

Lupon related actions

## Endponts

- [/case-create](#case-create)
- [/case-update](#case-update)

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
