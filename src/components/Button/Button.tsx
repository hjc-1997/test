import * as React from "react";
// import './button.css';
//可以具体制定名字引入，这样可以单独使用
import * as styles from "./button.css";
//也可以这样引入，默认全部覆盖和styleName相对应
// import  './button.css';
export default class Button extends React.Component<any> {
    render() {
        return (
            <>
                <div className="hjc"></div>
                <button styleName="primary btn-info" className={styles.buttonSuccess}>
                    99999
                </button>

            </>
        );
    }
}
