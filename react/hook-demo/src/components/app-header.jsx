import { Component } from 'react'
import './app-header.css'
import AppButton from './app-button'
import { AppContext } from '../App';
import lightIcon from '../icons/light.svg';
import darkIcon from '../icons/dark.svg';

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
        // ----
        const loginAction = <AppButton variant="primary" onClick={this.login}>登录</AppButton>
        const logoutAction = <AppButton variant="bordered" onClick={this.logout}>退出</AppButton>


        return (
            <AppContext.Consumer>
            {({theme, setTheme}) => (
                <div className="app-header">
                    <h1 className="title" onClick={this.changeEmoji} style={{cursor:'pointer', fontSize:'24px' }}>{name} {emoji}</h1>
                    <div className='content'>
                        {/* {theme} */}
                        {isLoggedIn && <div>你好，开发者！</div>}
                        {isLoggedIn?logoutAction:loginAction}
                        {theme === 'light'? (
                            <img src={lightIcon}  onClick={() => setTheme("dark")}/>
                        ):(
                            <img src={darkIcon}  onClick={() => setTheme("light")}/>
                        )}
                    </div>
                </div>
            )}
            
            </AppContext.Consumer>
        )
  }
}

export default AppHeader