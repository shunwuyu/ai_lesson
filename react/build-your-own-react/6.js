//  an element is an object with type and props
// The only thing that our function needs to do is create that object.
// function createElement(type, props, ...children) {
// return {
//     type,
//     props: {
//     ...props,
//     children,
//     },
// }
// }

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === "object"
                ? child
                : createTextElement(child)
            ),
        },
    }
    }
    
    function createTextElement(text) {
        return {
          type: "TEXT_ELEMENT",
          props: {
            nodeValue: text,
            children: [],
          },
        }
      }

const Didact = {
    createElement,
}

/** @jsx Didact.createElement */
const element = (
    <div id="foo">
        <a>bar</a>
        <b />
    </div>
)
    
// const element = Didact.createElement(
//     "div",
//     { id: "foo" },
//     Didact.createElement("a", null, "bar"),
//     Didact.createElement("b")
// )
console.log(element)
const container = document.getElementById("root")
// ReactDOM.render(element, container)