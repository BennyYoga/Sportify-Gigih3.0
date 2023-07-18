
## API Reference
#### Login
```http
  Post /login
```
after Login you get JWT token for access all feature API in this project
Use this Username And Password in your body to get Token
| Username | Password     | Description                |
| :-------- | :------- | :------------------------- |
| `Benny` | `1234` | User 1 |
| `Yoga` | `1234` | User 2 |
#### Get all Data
```http
    GET /            **Get All Data
    GET / song       **Get Song has been added
    GET / playlist   **Get Playlist has been added
```
Get All data user from User Information, Playlist including Song

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Your API Token |

#### Insert/Update Data Spesific Item

```http
    POST / playlist
```
Method for make new playlist
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Your API Token |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name your playlist |
| `desc`      | `string` | **Required**. description of your playlist |
-----
```http
    POST / addtolaylist       **Get Song has been added
```    
Method for add song in Song.json to some playlist your choose
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Your API Token |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `IdPlaylist`      | `string` | **Required**. Id your playlist |
| `IdSong`      | `string` | **Required**. Id Song |
-----
```http
    POST /add/:id   **Get Playlist has been added
```
Method play add song in the playlist
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Your API Token |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of Song |
-----
```http
    PATCH /play/:id   **Get Playlist has been added
```
    Method play some song in the playlist and when you get all song this sort by order by descending to playing song
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Your API Token |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of Song |

