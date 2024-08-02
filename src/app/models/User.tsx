import { Role } from "./role.enum";

export class User {
    _id: string;
    username: string;
    email: string;
    roles: Role[];

    constructor(_id:string, username: string, email: string, roles: Role[]) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
  }
  