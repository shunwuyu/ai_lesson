import { useMemo } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { MaterialItem } from "../MaterialItem";
export function Material() {
    const { componentConfig } = useComponentConfigStore();

    const components = useMemo(() => {
        // 获取对象 componentConfig 的所有可枚举属性值，并返回一个包含这些值的数组。
        return Object.values(componentConfig);
     }, [componentConfig]);

    return <div>{
        components.map((item, index) => {
            return <MaterialItem key={item.name + index} name={item.name} />
        })
    }</div>
}
