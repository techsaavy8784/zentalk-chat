import React from 'react';

export default function MsglistComponent(props:any) {      
    return (        
    <div className="message-list" >    
        <div className="message full-width" >
            {
                props.messages.map(function(message:any, i:any) {
                    return(
                    <div className='message' key={i}>
                    <p className="you">
                        <span className={(message.sender == props.orgPkey) ? 'user1' : 'user2'}>
                            {props.getKeyShorted(message.sender)}
                        </span>
                            &#10148; {message.text}
                    </p>   
                    </div>
                    )                 
                })
                
            } 
            <div className='scroll-to' ref={props.chatView}></div>           
        </div>        
    </div>
    )
}