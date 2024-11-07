
export class RegisterUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly name: string
    ) { }

    public static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { email, password, name } = object

        if(!email) return ['Missing email']
        if(!password) return ['Missing password']
        if(!name) return ['Missing name']

        return [undefined, new RegisterUserDto(email, password, name)]
    }
}