import { Component } from "react";
import './app-form.css';

// 受控组件
// 表单数据  由react 控制， 表单要用react状态， 元素发生改变，
// 要修改对应的state,
class AppForm extends Component {
    
    state = {
        content: ''
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log(this.state)
    }
    onChangeContent = (e) => {
        this.setState({
            content: e.currentTarget.value
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" name="content" 
                        value={this.state.content}
                        onChange={this.onChangeContent}
                    />
                    <input type="submit" name="提交" />
                    <span> - Content: {this.state.content}</span>
                </form>
            </div>
        )
    }
}

export default AppForm