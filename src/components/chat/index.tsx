import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import Immutable from 'immutable';
import NavbarComponent from "../navbar";
import MsglistComponent from "../msglist";
import SidebarComponent from "../sidebar";
import { BiMenu } from "react-icons/bi";
import MsgsenderComponent from "../msgsender";

let originPublicKey: any = null;
let socket = io();

export default function ChatbarComponent() {


    const [currentRoom, setCurrentRoom] = useState(null);

    const chatView = React.useRef<any>(null);
    const ZentalkWorker = new Worker('zentalk-worker.js');
    const [destinationPublicKey, setDestinationPublicKey] = useState(null);
    const [notifications, setNotifications] = useState<any>([]);
    const [pendingRoom, setPendingRoom] = useState((Math.floor(Math.random() * 1000 * 100)).toString());
    const [messages, setMessages] = useState<any>([]);
    const [draft, setDraft] = useState('');
    const [msg_num, setMsgNum] = useState(messages.length);
    const [viewInfo, setViewInfo] = useState(true);
    const [sidebarState, setSidebarState] = useState(Boolean);
    const [menuState, setMenuState] = useState(Boolean);

    useEffect(() => {
        handleScreen();
        create();
        window.addEventListener("resize", ()=>{handleScreen()});        
    }, []);

    const handleScreen = () => {
        if (window.innerWidth<1024) {
            setSidebarState(false);
            setMenuState(true);
        }else{
            setSidebarState(true);
            setMenuState(false);
        }
    }

    const create = async () => {
        addNotification('Welcome Zentalk-Web!');
        addNotification('Please Wait Zentalk Generating New Key-Pair...');
        originPublicKey = await getWebWorkerResponse('generate-keys');
        addNotification(
            `Keypairs Are Now Generated: ${getKeyShorted(originPublicKey)}`
        );
        addNotification('User see only the Public-Key');
        socket = io();
        setupSocketListeners();
    }

    function addNotification(message: string) {
        const timestamp = new Date().toLocaleTimeString();
        let data: any[] = notifications;
        data.push(timestamp.concat('<=>' + message));
        setNotifications(data); //simple value                   
    }

    function getWebWorkerResponse(messageType: any, messagePayload?: any) {
        return new Promise((resolve) => {
            const messageId = Math.floor(Math.random() * 100000 * 10).toString();
            ZentalkWorker.postMessage(
                [messageType, messageId].concat(messagePayload)
            );
            const handler = function (e: any) {

                if (e.data[0] === messageId) {
                    e.currentTarget.removeEventListener(e.type, handler);
                    resolve(e.data[1]);
                }
            };
            ZentalkWorker.addEventListener('message', handler);
        });
    }

    function getKeyShorted(key: any) {
        return key?.slice(400, 416, 432);
    }

    function setupSocketListeners() {
        socket.on('connect', () => {            
            addNotification('Safe Connected With Zentalk');
            joinRoom();
        });

        socket.on('disconnect', () =>
            addNotification('Zentalk Lost Connection')
        );

        socket.on('MESSAGE', async message => {
            if (message.recipient === originPublicKey) {
                message.text = await getWebWorkerResponse(
                    'decrypt',
                    message.text
                );
                let old_msg: any[] = messages;
                old_msg.push(message);
                setMessages(old_msg);
                setMsgNum(messages.length);
                autoscroll();
            }
        });

        socket.on('NEW_CONNECTION', () => {
            addNotification('Another User Has Joined The Room');
            sendPublicKey();
        });

        socket.on('ROOM_JOINED', newRoom => {            
            setCurrentRoom(newRoom);                        
            addNotification(
                `User Have Joined The Zentaroom - ${newRoom}`
            );
            sendPublicKey();
        });

        socket.on('PUBLIC_KEY', key => {
            addNotification(
                `Public Key Received - ${getKeyShorted(key)}`
            );
            setDestinationPublicKey(key);
        });

        socket.on('user disconnected', () => {
            addNotification(
                `The User is Disconnected - ${getKeyShorted(
                    destinationPublicKey
                )}`
            );
        });

        socket.on('ROOM_FULL', () => {
            addNotification(
                `Cannot Join ${pendingRoom.toString()}, Zentaroom is full`
            );
            setPendingRoom(Math.floor(Math.random() * 1000 * 10).toString());
            joinRoom();
        });

        socket.on('INTRUSION_ATTEMPT', () => {
            addNotification(
                'Sorry Third User are attempted to join the Zentarooms'
            );
        });
    }

    function joinRoom() {
        // debugger        
        if (pendingRoom !== currentRoom && originPublicKey) {
            addNotification(`Connecting to Zentaroom - ${pendingRoom}`);
            if (currentRoom !== null) {
                // setMessages([]);
            }
            setDestinationPublicKey(null);
            let value = pendingRoom;
            socket.emit('JOIN', value);
        }
    }

    function sendPublicKey() {
        if (originPublicKey) {
            socket.emit('PUBLIC_KEY', originPublicKey);
        }
    }


    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            if (e.target.name == "Send Msg") {
                sendMessage();
            }

            if (e.target.name == "Choose Room") {
                joinRoom();
            }
        }
    }

    const handleClickDown = (e: any) => {
        if (e.target.name == "JOIN") {
            joinRoom()
        }
        else {
            setViewInfo(!viewInfo);
        }

    }

    const sendMessage = async () => {
        if (!draft || draft === '') {
            return;
        }
        let message = Immutable.Map({
            text: draft,
            recipient: destinationPublicKey,
            sender: originPublicKey
        });
        setDraft('');
        addMessage(message.toObject());

        if (destinationPublicKey) {
            const encryptedText = await getWebWorkerResponse('encrypt', [
                message.get('text'),
                destinationPublicKey
            ]);
            const encryptedMsg = message.set('text', encryptedText);
            socket.emit('MESSAGE', encryptedMsg.toObject());
        }
    }

    function autoscroll(element?: any) {
        scrollToBottom();
    }

    const scrollToBottom = () => {
        chatView.current.scrollIntoView();
    }

    function addMessage(message: any) {
        let oldmsg: any[] = messages;
        oldmsg.push(message);
        setMessages(oldmsg);
        setMsgNum(messages.length);
        autoscroll();
    }

    const handleOnChange = (e: any) => {
        if (e.target.name == "Send Msg") {
            setDraft(e.target.value);
        }

        if (e.target.name == "Choose Room") {
            setPendingRoom(e.target.value);
        }

    }

    var orgPkey = originPublicKey;

    return (
        <div id="zentalk">
            <NavbarComponent />
            {
                menuState &&
            <div className="menu-btn">
                            <button 
                                className="menu-button" 
                                type="submit" 
                                onClick={ () => setSidebarState(!sidebarState) }  
                                value=""
                                name="Menu"
                            >
                            <BiMenu className="menu-icon" />
                            </button>
                        </div>
            }
            <SidebarComponent  
                toshow={sidebarState}
                viewInfo={viewInfo}
                notifications={notifications}
                destinationPublicKey={destinationPublicKey}
                originPublicKey={originPublicKey}
                pendingRoom={pendingRoom}
                getKeyShorted={getKeyShorted}
                handleClickDown={handleClickDown}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
            />
            <div className="full-width">
                <MsglistComponent
                    messages={messages}
                    orgPkey={orgPkey}
                    chatView={chatView}
                    getKeyShorted={getKeyShorted}

                />
            </div>
            <MsgsenderComponent
                draft={draft}
                name="Send Msg"
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}