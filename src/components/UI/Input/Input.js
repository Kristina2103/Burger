import React from 'react'
import classes from './Input.css'

const Input = props => {
    let inpputElement
    const inputClasses = []
    if(!props.valid && props.shouldValidate){
        inputClasses.push(classes.Invalid)
    }
    switch(props.elementType ){
        case('input'):
            inpputElement = <input className={inputClasses.join('')}  {...props.elementConfig} value={props.value} onChange={props.onInputChange} name={props.name}/>
            break;
        case('textarea'):
            inpputElement = <textarea className={inputClasses.join('')} {...props.elementConfig} value={props.value} onChange={props.onInputChange} name={props.name} />
            break;
        case('select'):
            const options = props.elementConfig.options.map(o => <option key={o.value} value={o.value} >{o.displayValue}</option>)
            inpputElement = <select className={inputClasses.join('')} name={props.name}  value={props.value} onChange={props.onInputChange} > {options} </select>
            break
            
        default:
        inpputElement = <input className={inputClasses.join('')} name={props.name} {...props.elementConfig} value={props.value} onChange={props.onInputChange}/>
    }
   
    return(
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inpputElement}
        </div>
    )
}
export default Input