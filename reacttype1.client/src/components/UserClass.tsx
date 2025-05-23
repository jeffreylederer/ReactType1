 class UserClass {

    id: number  = 0;
    userName: string = "";
    role: string = "";

    constructor() {
        const value = localStorage.getItem("user");
        if (typeof value === 'string') {
            const user: UserType = JSON.parse(value) // ok
            this.id = user.id;
            this.userName = user.userName;
            this.role = user.role;

        }
        else
            this.id = 0;

    }

    Remove() {
        localStorage.removeItem("user");
    };

    IsNull(): boolean {
        const value = localStorage.getItem("user");

        if (typeof value === 'string' && this.id > 0)
            return true;
        return false;
    }

    Initialize(user: UserType) {
        this.id = user.id;
        this.userName = user.userName;
        this.role = user.role;
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export type UserType = {
    id: number;
    userName: string;
    role: string;
}

export default UserClass;