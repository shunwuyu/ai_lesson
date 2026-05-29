function error(message: string): never {
  throw new Error(message);
}
type ButtonType = 'primary' | 'secondary' | 'danger';

function getButtonColor(type: ButtonType): string {
  switch (type) {
    case 'primary':
      return 'blue';
    case 'secondary':
      return 'gray';
    case 'danger':
      return 'red';
    default:
      // 这里使用 never 做穷尽检查
      const _exhaustiveCheck: never = type;
      return _exhaustiveCheck;
  }
}
