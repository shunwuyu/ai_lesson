// 类型转换 隐式
console.log(`${[1,2,3]}`, [1,2,3].toString())

let arr = [{value: 1}, {value: 2}];
let message = `
	<ul>
		${arr.map((item) => {
			return `
				<li>${item.value}</li>
			`
		}).join('')}
	</ul>
`;
console.log(message);
