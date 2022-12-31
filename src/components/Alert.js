import React from 'react'

export default function Alert(props) {
    const caps=(word)=>{
        if (word==="danger"){
            word="Error";
        }
        const lo=word.toLowerCase();
        return lo.charAt(0).toUpperCase()+lo.slice(1);

    }
    return (
        <div style={{height:'60px'}}>
       { props.alert && 
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}role="alert">
                <strong>{caps(props.alert.type)}</strong>: {props.alert.msg}
            </div>
}
        </div>
    )
}