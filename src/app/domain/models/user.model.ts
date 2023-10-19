export class User {
    private _id: number;
    private _username: string;
    private _name: string;
    private _email: string;
    private _hashedPassword: string;

    constructor(id: number, username: string, name: string, email: string, password: string) {
        this._id = id;
        this._username = username;
        this._name = name;
        this._email = email;
        this._hashedPassword= password;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get hashedPassword(): string {
        return this._hashedPassword;
    }

    set hashedPassword(value: string) {
        this._hashedPassword = value;
    }
}