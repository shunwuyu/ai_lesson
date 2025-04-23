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

const element = React.createElement(
    "div",
    { id: "foo" },
    React.createElement("a", null, "bar"),
    React.createElement("b")
)
const container = document.getElementById("root")
ReactDOM.render(element, container)