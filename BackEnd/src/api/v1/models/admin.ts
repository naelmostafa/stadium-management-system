import { User, UserModel } from './user';

interface Admin extends User {
  // ...
}

class AdminModel extends UserModel {
  // ...
}

export { Admin, AdminModel };