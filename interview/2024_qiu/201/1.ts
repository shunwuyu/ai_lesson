// 接口的写法-------------
interface IPerson {
	name: string,
	age: number
}

const user1:IPerson = {
	name: 'a',
	age: 20
}

// type的写法-------------
type Person  = {
	name: string,
	age: number
}
const user2:Person = {
	name: 'b',
	age: 20
}

type MyStringType = string;

// const str:MyStringType = 123