import React from "react";
const SidebarComponent = (props:any) => {

    return (
                <div  className={`info-container full-width ${props.toshow?'show-bar':'hide-bar'}`}>
            {
                props.viewInfo ?
                    <div>
                        <div id="chatjoin">
                            <div className="room-select">
                                <input 
                                    type="text" 
                                    className="room-id" 
                                    placeholder="Choose Room" 
                                    id="room-id" 
                                    name="Choose Room"
                                    value={props.pendingRoom}
                                    onChange={props.onChange} 
                                    onKeyDown={props.onKeyDown}
                                />
                            </div>
                        </div>
                        <div className="room-btn">
                            <input 
                                className="join-button" 
                                type="submit" 
                                onClick={props.handleClickDown}  
                                value="JOIN"
                                name="JOIN"
                            />
                        </div>
                        <div className="divider"></div>
                        <div className="notification-list">
                        <div className="notification-list">
                        {
                            props.notifications.length !=0 ? 
                            props.notifications.map((item:any,i:any) => 
                                    <div key={i} className="notification left-align">
                                        <div className={i%2 == 0 ?"notification":"notification-message"}>{item}</div>
                                    </div> 
                                ):""
                        }
                        </div>
                        <div className="flex-fill"></div>
                        <div className="divider"></div>
                        
                        <div className="keys full-width">
                            <div className="user2_Key">
                            {
                                props.destinationPublicKey? 
                                <div className="input-wrap">
                                    <input type="checkbox" onClick={props.handleClickDown} className="publicKey--visibleToggle" defaultChecked />
                                    <div className="publicKey--background"></div>
                                    {
                                        props.viewInfo?
                                            <div className="publicKey--visibleToggle-eye open">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/138980/eye-open.png" alt="eye" />
                                            </div>
                                        :
                                            <div>
                                                <div className="publicKey--visibleToggle-eye open">
                                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/138980/eye-open.png" alt="eye" />
                                                </div>
                                                <div className="publicKey--visibleToggle-eye close">
                                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/138980/eye-close.png" alt="eye-close" />
                                                </div>
                                            </div>
                                    }

                                    <h3>THEIR PUBLIC KEY & IDENTIFICATION - { props.getKeyShorted(props.destinationPublicKey)}</h3>
                                    <p>{props.destinationPublicKey}</p>
                                </div>
                                :
                                <h4 className="waiting-use">Waiting for second user to join room...</h4>
                            }
                            </div>

                            <div className="dividerkey"></div>

                            <div className="user1_Key">
                            {
                                props.originPublicKey ? <div>
                                    <h3>YOUR PUBLIC KEY & IDENTIFICATION - {props.getKeyShorted(props.originPublicKey)}</h3>
                                    <p>{props.originPublicKey}</p>
                                </div> 
                                :                         
                                <div className="keypair-loader full-width">
                                    <div className="loader"></div>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                    </div>
                :
                    <div>
                        <div className="keys full-width">
                            <div className="user2_Key">
                            {
                                props.destinationPublicKey? 
                                <div className="input-wrap">
                                    <input 
                                        type="checkbox" 
                                        onClick={props.handleClickDown} 
                                        className="publicKey--visibleToggle" 
                                        defaultChecked
                                    />
                                    <div className="publicKey--background"></div>
                                    {
                                        props.viewInfo?
                                            <div className="publicKey--visibleToggle-eye open">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/138980/eye-open.png" alt="eye" />
                                            </div>
                                        :
                                            <div>
                                                <div className="publicKey--visibleToggle-eye open">
                                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/138980/eye-open.png" alt="eye" />
                                                </div>
                                                <div className="publicKey--visibleToggle-eye close">
                                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/138980/eye-close.png" alt="eye-close" />
                                                </div>
                                            </div>
                                    }
                                </div>
                                :
                                ''
                            }
                            </div>
                            <div className="dividerkey"></div>
                        </div>
                    </div>
            }
        </div>        
    )
}

export default SidebarComponent