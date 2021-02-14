# 4life
It's an basic app for taking care your routine.

### Technologies
#### Front-end
* [React.js](https://github.com/facebook/react)
* [react-easy-crop](https://github.com/ricardo-ch/react-easy-crop)
* [styled-components](https://github.com/styled-components/styled-components)
* [Axios](https://github.com/axios/axios)
* [Redux](https://github.com/reduxjs/redux)



#### Back-end
* [Node.js](https://github.com/nodejs/node)
* [Express.js](https://github.com/expressjs/express)
* [DropboxSDK](https://github.com/dropbox/dropbox-sdk-js)
* [Mongoose](https://github.com/Automattic/mongoose)
* [GoogleApi](https://github.com/googleapis/google-api-nodejs-client)
* [nodemailer](https://github.com/nodemailer/nodemailer)



### LocalSetup
1. Clone this repo.
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