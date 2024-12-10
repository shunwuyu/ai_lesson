async function p2() {
  return Promise.resolve('p2');
}

async function p3() {
  return await Promise.resolve('p3');
}

p2().then((res) => {
  console.log(res);
});

p3().then((res) => {
  console.log(res);
});