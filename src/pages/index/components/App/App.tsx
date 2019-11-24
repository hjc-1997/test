import * as React from "react";
import "./app.scss";
// import './app.scss';
// const styles = require('./app.scss');
// import * as Security from '../../../../assets/images/security.svg';
const Security = require("../../../../assets/images/security.svg");
const Png = require("../../../../assets/images/test.png");
import Button from "components/Button/Button";

export default class App extends React.Component<any> {

    render() {
        return (
            <div>
                <div className="hjc">
                    {/*使用String转换成字符串*/}
                    <img src={String(Security)} />
                    <img src={String(Png)} />
                    {/*下面这样引用，图片会报404错误 ，在html中直接引入图片也会报错*/}
                    {/*<img src='../../../../assets/images/security.svg' alt=''/> */}
                </div>
                <h1 styleName="title" className="iconfont">
          &#xe64e; Hello, Webpack + React + Typescript!(^_^)
                </h1>
                <Button />
            </div>
        );
    }
}
