export function emit(instance, event, ...args) {
  // 从组件实例中解构出props
  const { props } = instance;

  // 将事件名转换为驼峰命名，并加上on前缀
  // 例如：'click' -> 'onClick'
  let handlerName = `on${event[0].toUpperCase() + event.slice(1)}`;
  // 从props中查找对应的事件处理函数
  let handler = props[handlerName];

  // 特殊处理v-model的update:事件
  // 例如：'update:modelValue' -> 'onUpdate:modelValue'
  if (!handler && event.startsWith('update:')) {
    // 处理update:事件名，保持首字母小写
    handlerName = `onUpdate:${event.slice(7)[0].toLowerCase()}${event.slice(8).slice(1)}`;
    // 再次尝试从props中查找处理函数
    handler = props[handlerName];
  }

  // 如果找到处理函数
  if (handler) {
    // 如果处理函数是单个函数
    if (typeof handler === 'function') {
      // 直接调用该函数，并传递参数
      handler(...args);
    } 
    // 如果处理函数是数组（Vue支持多个事件处理函数）
    else if (Array.isArray(handler)) {
      // 遍历数组，依次调用每个处理函数
      handler.forEach(h => h(...args));
    }
  } else {
    // 如果没有找到对应的事件处理函数，输出警告
    console.warn(`No handler for event "${event}"`);
  }
}


const props = {
  onClick: (...args) => console.log('Clicked with:', args)
};

const instance = { props };

emit(instance, 'click', 'arg1', 'arg2');


const props = {
  onClick: [
    (...args) => console.log('First handler called with:', args),
    (...args) => console.log('Second handler called with:', args)
  ]
};

const instance = { props };

emit(instance, 'click', 'arg1', 'arg2');
// 预期输出:
// "First handler called with:" ['arg1', 'arg2']
// "Second handler called with:" ['arg1', 'arg2']

const props = {
  onClick: [
    (...args) => console.log('First handler called with:', args),
    (...args) => console.log('Second handler called with:', args)
  ]
};

const instance = { props };

emit(instance, 'click', 'arg1', 'arg2');
// 预期输出:
// "First handler called with:" ['arg1', 'arg2']
// "Second handler called with:" ['arg1', 'arg2']

const props = {
  onUpdateModelValue: (...args) => console.log('Update model value with:', args)
};

const instance = { props };

emit(instance, 'update:modelValue', 'newValue');
// 预期输出: "Update model value with:" ['newValue']

const props = {};

const instance = { props };

emit(instance, 'click', 'arg1', 'arg2');
// 预期输出: 控制台警告 "No handler for event "click""

const props = {
  onCLick: (...args) => console.log('Clicked with different case:', args)
};

const instance = { props };

emit(instance, 'click', 'arg1', 'arg2');
// 预期输出: 控制台警告 "No handler for event "click""
// 注意：由于JavaScript对大小写的敏感性，此处不会匹配到'onCLick'