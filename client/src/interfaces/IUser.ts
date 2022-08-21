export default class IUser {
    public constructor(
        public userId?: number,
        public firstName?: string,
        public lastName?: string,
        public username?: string,
        public password?: string,
        public userType?: string
    ) { }
}