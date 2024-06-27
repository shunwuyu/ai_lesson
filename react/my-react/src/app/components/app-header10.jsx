import { Component } from 'react'

class AppHeader extends Component {
    
    constructor(props) {
      super(props)
      this.state = {
        emoji: '😊'
      }

      console.log(111)
    }

    componentDidMount() {
       setInterval(() => this.changeEmoji(), 3000) 
    }

    componentDidUpdate() {
        console.log('update', this.state.emoji);
    }


    changeEmoji = () => {
        this.setState({
            emoji: this.state.emoji === '😊' ? '😍' : '😊'
        })
    }

    render() {
    const { name } = this.props
    const { emoji} = this.state

    return (
      <div className="app-header">
        <h1 className="title">{name} {emoji}</h1>
      </div>
    )
  }
}

export default AppHeader