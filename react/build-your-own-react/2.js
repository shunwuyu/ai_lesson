// And now we have the same app as before, but without using React.
const element = {
    type: "h1",
    props: {
      title: "foo",
      children: "Hello",
    },
  }

  const container = document.getElementById("root")

  const node = document.createElement(element.type)
  node["title"] = element.props.title

  const text = document.createTextNode("")
  text["nodeValue"] = element.props.children

  node.appendChild(text)

  container.appendChild(node)