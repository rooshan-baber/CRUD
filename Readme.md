## Setup
To get started, follow these steps:

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install` to install the necessary dependencies.
3. Start the frontend server by running `ng serve`.

### Backend Setup
1. Navigate to the `backend` directory.
2. Run `npm install` to install the necessary dependencies.
3. Start the backend server by running `npm start`.

### Database Configuration
Make sure to configure your database properly for the project to work. You can find the configuration in the `config.js` file in the backend directory.

#### config.js
```javascript
const sequelize = new Sequelize("databasename","username","password",{
  dialect: "mysql",
  host: "localhost"
});
module.exports = sequelize;