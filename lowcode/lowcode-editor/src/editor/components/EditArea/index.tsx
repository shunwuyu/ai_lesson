import React, { useState, useEffect, type MouseEventHandler } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import {  useComponetsStore, type Component } from "../../stores/components"
import HoverMask  from "../HoverMask";
export function EditArea() {
    const { components, addComponent } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();
    const [hoverComponentId, setHoverComponentId] = useState<number>();
    // useEffect(()=> {
    //     addComponent({
    //         id: 222,
    //         name: 'Container',
    //         props: {},
    //         children: []
    //     }, 1);

    //     addComponent({
    //         id: 333,
    //         name: 'Button',
    //         props: {
    //             text: '无敌'
    //         },
    //         children: []
    //     }, 222);
    // }, []);


    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            console.log(component, '????////');
            const config = componentConfig?.[component.name]
            // console.log(componentConfig, '????')
            // console.log(config?.component, '----')
            if (!config?.component) {
                return null;
            }
            console.log(config?.component, '--||--')
            return React.createElement(
                config.component,
                {   
                    id: component.id,
                    key: component.id,
                    ...config.defaultProps,
                    ...component.props,
                },
                renderComponents(component.children || [])
            )
        })
    }

    const handleMouseOver: MouseEventHandler = (e) => {
        // debugger;
        const path = e.nativeEvent.composedPath();

        for (let i = 0; i < path.length; i += 1) {
            const ele = path[i] as HTMLElement;

            const componentId = ele.dataset?.componentId;
            if (componentId) {
                setHoverComponentId(+componentId);
                return;
            }
        }
    }

    return <div className="h-[100%] edit-area" 
        onMouseOver={handleMouseOver}
        onMouseLeave={() => setHoverComponentId(undefined)}
        >
        {/* <pre>
            {JSON.stringify(components, null, 2)}
        </pre> */}
        
        {renderComponents(components)}
        {hoverComponentId && (
            <HoverMask 
                containerClassName="edit-area"
                componentId={hoverComponentId}
            />
        )}
    </div>
}
