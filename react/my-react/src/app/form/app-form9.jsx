import { Component } from "react";
import './app-form.css';

// 受控组件
// 表单数据  由react 控制， 表单要用react状态， 元素发生改变，
// 要修改对应的state,
class AppForm extends Component {
    
    state = {
        content: '',
        checked: false,
        content: ''
        // item:"黑虎泉",
        fileList:null
    }

    // parks = [
    //     {id:1, value:'未名湖'},
    //     {id:2, value:'黑虎泉'},
    //     {id:3, value:'趵突泉'}
    // ]

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log(this.state)
    }
    // onChangeContent = (e) => {
    //     this.setState({
    //         content: e.currentTarget.value
    //     })
    // }
    
    // onCheckboxChange = (event) => {
    //     this.setState({
    //         checked:event.currentTarget.checked
    //     })
    // }
    // ----
    onChange = ({currentTarget:{files}}) => {
        this.setState({
            fileList: files
        })
    } 

    render() {
        console.log(this.state)
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <div>
                        {/* <textarea 
                            placeholder="写点东西"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                        > */}

                        {/* </textarea> */}
                    </div>
                   
                    <div>
                        <input type="file" multiple onChange={this.onChange} />
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