# 4life
It's an basic app for taking care your routine.

### Technologies
#### Front-end
* [React.js v17.0.1](https://github.com/facebook/react)
* [react-easy-crop v3.3.0](https://github.com/ricardo-ch/react-easy-crop)



#### Back-end
* [Node.js v5.10.11](https://github.com/nodejs/node)
* [Axios v0.21.0](https://github.com/axios/axios)
* [Express.js v4.17.1](https://github.com/expressjs/express)
* [DropboxSDK v8.1.0](https://github.com/dropbox/dropbox-sdk-js)
* [Mongoose v5.10.11](https://github.com/Automattic/mongoose)



### LocalSetup
1. Clone this repo
2. Open two terminals, one in ```web``` folder and the other in ```backend``` folder.
3. Before run you must config .env from backend folder. For this you must fill .env with this variables.
```
MONGO_URL = YOUR_MONGO_DATABASE_URL
SERVER_PORT = YOUR_SERVER_PORT
ACCESS_TOKEN_SECRET = YOUR_ACCESS_TOKEN_SECRET
DROPBOX_ACCESS_TOKEN = YOUR_DROPBOX_ACCESS_TOKEN
```
<span style="color:red; font-size: 80%;">Don't forget to put your ```PORT``` in the api config.</span>

4. Then you can type ```npm run dev``` in your backend terminal and ```npm run start``` in your frontend terminal.



### Photos

<img src="https://i.imgur.com/SP6LCU7.png" width="700"/>

<img src="https://i.imgur.com/LOmbGzU.png" width="700"/>