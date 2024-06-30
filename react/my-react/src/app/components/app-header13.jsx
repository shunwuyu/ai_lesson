import { Component } from 'react'
import './app-header.css'
class AppHeader extends Component {
    
    constructor(props) {
      super(props)
      this.state = {
        emoji: '😊',
        isLoggedIn: false
      }

      console.log(111)
    }

    login = () => {
        this.setState({
            isLoggedIn: true
        })
    }

    logout = () => {
        this.setState({
            isLoggedIn: false
        })
    }


    // changeEmoji = () => {
    //     this.setState({
    //         emoji: this.state.emoji === '😊' ? '😍' : '😊'
    //     })
    // }

    changeEmoji = (event) => {
        console.log(event, '????')
        this.setState({
            emoji: this.state.emoji === '😊' ? '😍' : '😊'
        })
    }

    render() {
        const { name } = this.props
        const { emoji, isLoggedIn } = this.state
        const loginAction = <button onClick={this.login}>登录</button>
        const logoutAction = <button onClick={this.logout}>退出</button>


        return (
            <div className="app-header">
                <h1 className="title" onClick={this.changeEmoji} style={{cursor:'pointer', fontSize:'24px' }}>{name} {emoji}</h1>
                <div className='content'>
                    {isLoggedIn && <div>你好，开发者！</div>}
                    {isLoggedIn?logoutAction:loginAction}
                </div>
            </div>
        )
  }
}

export default AppHeader