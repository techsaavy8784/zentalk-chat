import React from 'react';

export default function MsgsenderComponent(props:any) {    
        return (
        <div className="bottom-bar full-width" id="message-input">
                <div className="gradient-border">
                    <input 
                        className="message-input" 
                        type="text" 
                        placeholder="Your Message..." 
                        name="Send Msg"
                        onChange={props.onChange} 
                        onKeyDown={props.onKeyDown}
                        value={props.draft}
                    />
                </div>
            </div>
        )
}