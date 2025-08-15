// 接下来，我们可以使用，WeakMap提代Map来使代码达到画龙点睛的作用。
// function clone(target, map = new Map()) {
// WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
// 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器
// 回收的引用。 一个对象若只被弱引用所引用，
// 则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
function clone(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
