# Controller: clearance

Clearance related actions

## Endponts

- [/list](#list)
- [/fetch](#fetch)
- [/create](#create)
- [/update](#update)

### list

Get clearance list

[ClearanceListDto](https://github.com/jmrl23/sia-backend/tree/main/src/clearance/dto/clearance-list.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({
  confirmed: true,
  take: 1,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/clearance/list', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "clearances": [
    {
      "id": "0ca64052-10fd-4942-9494-41c095d7d3ac",
      "dateCreated": "2023-06-08T06:09:09.660Z",
      "dateUpdated": "2023-06-08T06:14:44.181Z",
      "clearanceType": "EMPLOYMENT",
      "clearanceTypeOthers": null,
      "purposeOfClearance": "secret",
      "registerVoterBarangay": true,
      "businessAddress": "sa bahay lang namin",
      "nationality": "filipino",
      "placeOfBirth": "secret ulit",
      "numberOfYearsLiving": 2,
      "confirmed": true,
      "userId": "02a9c606-e548-4f0b-9552-1289a2443245",
      "User": {
        "id": "02a9c606-e548-4f0b-9552-1289a2443245",
        "dateCreated": "2023-06-07T06:35:56.272Z",
        "dateUpdated": "2023-06-07T06:35:56.272Z",
        "residentNumber": 6,
        "enabled": true,
        "email": "johndoe_admin@email.com",
        "role": "ADMIN",
        "residentStatus": "ACTIVE",
        "UserInformation": {
          "id": "3a23d621-9d4e-49d6-aea1-b2da709958ac",
          "dateCreated": "2023-06-07T06:35:56.272Z",
          "dateUpdated": "2023-06-07T06:35:56.272Z",
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
          "userId": "02a9c606-e548-4f0b-9552-1289a2443245",
          "pictureId": null,
          "Picture": null
        }
      }
    }
  ]
}
```

### fetch

Get clearance

[ClearanceFetchDto](https://github.com/jmrl23/sia-backend/tree/main/src/clearance/dto/clearance-fetch.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({
  id: '0ca64052-10fd-4942-9494-41c095d7d3ac',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/clearance/fetch', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "clearance": {
    "id": "0ca64052-10fd-4942-9494-41c095d7d3ac",
    "dateCreated": "2023-06-08T06:09:09.660Z",
    "dateUpdated": "2023-06-08T06:14:44.181Z",
    "clearanceType": "EMPLOYMENT",
    "clearanceTypeOthers": null,
    "purposeOfClearance": "secret",
    "registerVoterBarangay": true,
    "businessAddress": "sa bahay lang namin",
    "nationality": "filipino",
    "placeOfBirth": "secret ulit",
    "numberOfYearsLiving": 2,
    "confirmed": true,
    "userId": "02a9c606-e548-4f0b-9552-1289a2443245",
    "User": {
      "id": "02a9c606-e548-4f0b-9552-1289a2443245",
      "dateCreated": "2023-06-07T06:35:56.272Z",
      "dateUpdated": "2023-06-07T06:35:56.272Z",
      "residentNumber": 6,
      "enabled": true,
      "email": "johndoe_admin@email.com",
      "role": "ADMIN",
      "residentStatus": "ACTIVE",
      "UserInformation": {
        "id": "3a23d621-9d4e-49d6-aea1-b2da709958ac",
        "dateCreated": "2023-06-07T06:35:56.272Z",
        "dateUpdated": "2023-06-07T06:35:56.272Z",
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
        "userId": "02a9c606-e548-4f0b-9552-1289a2443245",
        "pictureId": null,
        "Picture": null
      }
    }
  }
}
```

### create

Create new clearance

[ClearanceCreateDto](https://github.com/jmrl23/sia-backend/tree/main/src/clearance/dto/clearance-create.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({
  clearanceType: 'EMPLOYMENT',
  purposeOfClearance: 'secret',
  registerVoterBarangay: true,
  businessAddress: 'sa bahay lang namin',
  nationality: 'filipino',
  placeOfBirth: 'secret ulit',
  numberOfYearsLiving: 2,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/clearance/create', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "clearance": {
    "id": "0ca64052-10fd-4942-9494-41c095d7d3ac",
    "dateCreated": "2023-06-08T06:09:09.660Z",
    "dateUpdated": "2023-06-08T06:09:09.660Z",
    "clearanceType": "EMPLOYMENT",
    "clearanceTypeOthers": null,
    "purposeOfClearance": "secret",
    "registerVoterBarangay": true,
    "businessAddress": "sa bahay lang namin",
    "nationality": "filipino",
    "placeOfBirth": "secret ulit",
    "numberOfYearsLiving": 2,
    "confirmed": false,
    "userId": "02a9c606-e548-4f0b-9552-1289a2443245",
    "User": {
      "id": "02a9c606-e548-4f0b-9552-1289a2443245",
      "dateCreated": "2023-06-07T06:35:56.272Z",
      "dateUpdated": "2023-06-07T06:35:56.272Z",
      "residentNumber": 6,
      "enabled": true,
      "email": "johndoe_admin@email.com",
      "role": "ADMIN",
      "residentStatus": "ACTIVE",
      "UserInformation": {
        "id": "3a23d621-9d4e-49d6-aea1-b2da709958ac",
        "dateCreated": "2023-06-07T06:35:56.272Z",
        "dateUpdated": "2023-06-07T06:35:56.272Z",
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
        "userId": "02a9c606-e548-4f0b-9552-1289a2443245",
        "pictureId": null,
        "Picture": null
      }
    }
  }
}
```

### update

Update clearance

[ClearanceUpdateDto](https://github.com/jmrl23/sia-backend/tree/main/src/clearance/dto/clearance-update.dto.ts)

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer <token>');

var raw = JSON.stringify({
  id: '0ca64052-10fd-4942-9494-41c095d7d3ac',
  confirmed: true,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/clearance/update', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "clearance": {
    "id": "0ca64052-10fd-4942-9494-41c095d7d3ac",
    "dateCreated": "2023-06-08T06:09:09.660Z",
    "dateUpdated": "2023-06-08T06:14:44.181Z",
    "clearanceType": "EMPLOYMENT",
    "clearanceTypeOthers": null,
    "purposeOfClearance": "secret",
    "registerVoterBarangay": true,
    "businessAddress": "sa bahay lang namin",
    "nationality": "filipino",
    "placeOfBirth": "secret ulit",
    "numberOfYearsLiving": 2,
    "confirmed": true,
    "userId": "02a9c606-e548-4f0b-9552-1289a2443245",
    "User": {
      "id": "02a9c606-e548-4f0b-9552-1289a2443245",
      "dateCreated": "2023-06-07T06:35:56.272Z",
      "dateUpdated": "2023-06-07T06:35:56.272Z",
      "residentNumber": 6,
      "enabled": true,
      "email": "johndoe_admin@email.com",
      "role": "ADMIN",
      "residentStatus": "ACTIVE",
      "UserInformation": {
        "id": "3a23d621-9d4e-49d6-aea1-b2da709958ac",
        "dateCreated": "2023-06-07T06:35:56.272Z",
        "dateUpdated": "2023-06-07T06:35:56.272Z",
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
        "userId": "02a9c606-e548-4f0b-9552-1289a2443245",
        "pictureId": null,
        "Picture": null
      }
    }
  }
}
```
