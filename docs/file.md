# Controller: file

File related actions

## Endponts

- [/upload](#upload)
- [/get/{id}/{name}](#get)

### upload

Upload files

> sample request

```js
var myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer <token>');

var formdata = new FormData();
formdata.append(
  'file',
  fileInput.files[0],
  '212130490_842799859986249_293855526589858065_n.jpg',
);
formdata.append(
  'file',
  fileInput.files[0],
  '282056863_314806524143336_4133158465700213537_n.jpg',
);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow',
};

fetch('https://sia-backend.serveo.net/file/upload', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

> sample response

```json
{
  "files": [
    {
      "id": "99305535-fe10-4197-834d-b93b49090d8e",
      "dateCreated": "2023-04-30T08:40:32.305Z",
      "dateUpdated": "2023-04-30T08:40:32.305Z",
      "fileId": "1rZvx7USiGqDJjLK_FqTnQYQpok7O6wbg",
      "name": "212130490_842799859986249_293855526589858065_n.jpg",
      "mimeType": "image/jpeg",
      "size": 250907
    },
    {
      "id": "bd65a8a5-2c83-40e0-b876-7c4b9fa6ef7d",
      "dateCreated": "2023-04-30T08:40:31.943Z",
      "dateUpdated": "2023-04-30T08:40:31.943Z",
      "fileId": "1ffqDBi8I564zFNHZFMC4tekfinyB4xev",
      "name": "282056863_314806524143336_4133158465700213537_n.jpg",
      "mimeType": "image/jpeg",
      "size": 130017
    }
  ]
}
```
