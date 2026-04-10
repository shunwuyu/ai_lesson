interface User {
    id: number
    name: string
    age: number
}

type UserNameAndAge = Pick<User, 'name' | 'age'>
const x:UserNameAndAge = {
    name: 'John',
    age: 30,
}