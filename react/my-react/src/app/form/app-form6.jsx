import { Component } from "react";
import './app-form.css';

// 受控组件
// 表单数据  由react 控制， 表单要用react状态， 元素发生改变，
// 要修改对应的state,
class AppForm extends Component {
    
    state = {
        content: '',
        checked: false,
        items:["黑虎泉"]
    }

    parks = [
        {id:1, value:'未名湖'},
        {id:2, value:'黑虎泉'},
        {id:3, value:'趵突泉'}
    ]

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log(this.state)
    }
    onChangeContent = (e) => {
        this.setState({
            content: e.currentTarget.value
        })
    }
    
    onCheckboxChange = (event) => {
        this.setState({
            checked:event.currentTarget.checked
        })
    }

    isChecked = (currentItem) => {
        return this.state.items.some((item) => item === currentItem)
    }

    onChange = ({currentTarget:{value, checked}}) => {
        const items = new Set(this.state.items)
        if (checked) {
            items.add(value)
        } else {
            items.delete(value)
        }
        this.setState({
            items: Array.from(items)
        })
    } 

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <div>
                        <textarea 
                            placeholder="写点东西"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                        >

                        </textarea>
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            checked={this.state.checked}
                            onChange={this.onCheckboxChange}
                        />
                    </div>
                    <div>
                        {this.parks.map(item =>(<label key={item.id}>
                                <input 
                                    
                                    type="checkbox" id={`tag-${item.id}`} 
                                    onChange={this.onChange}
                                    checked={this.isChecked(item.value)}
                                    value={item.value}
                                />
                                {item.value}
                            </label>
                        ))}
                    </div>
                    <input type="submit" name="提交" />
                    <span> - Content: {this.state.content}</span>
                    <pre>State: {JSON.stringify(this.state)}</pre>
                </form>
            </div>
        )
    }
}

export default AppForm