'use client'

import Style from "./components.module.css"
import classnames from 'classnames';
import clsx from "clsx";
export default function card(props){
    var whatToDo = () => {}
    // var onClick = ()=> {}
    try{
        // Onclick = props.onClick
        whatToDo = props.whatToDo
    } catch {
        ""
    }
    return <div className={clsx(Style.card, props.role == "title" && Style.cardTitle,
        props.role == "btn" && Style.cardBtn, props.type == "danger" && Style.cardBtnDanger
    ) } >
        {/* {console.log(props.href)} */}
        {props.href == undefined ? props.children : <div onClick={()=>{window.location.href = props.href}}>
            {props.children}
        </div>}
    </div>
}