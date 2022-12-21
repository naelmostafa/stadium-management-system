import { User, UserModel } from './user';

export interface Admin extends User {
  // ...
}

export class AdminModel extends UserModel {
  // ...
}
