import { Component } from "react";
import './app-form.css';
// 阻止提交

class AppForm extends Component {
    onSubmitForm = (e) => {
        e.preventDefault();
        
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" name="content"/>
                    <input type="submit" name="提交" />
                </form>
            </div>
        )
    }
}

export default AppForm