import { Component } from 'react'

class AppHeader extends Component {
  render() {
    const { name } = this.props
    return (
      <div className="app-header">
        <h1 className="title">{name}</h1>
      </div>
    )
  }
}

export default AppHeader