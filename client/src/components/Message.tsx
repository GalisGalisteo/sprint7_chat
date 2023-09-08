import React from 'react'

export interface IMessage {
    id: string;
    text: string;
    sentDate: string;
    userName: string;
}

interface Props {
	props: IMessage
}

const Message: React.FC<Props> = ({ props }) => {
	const backgroundColorClass = "bg-blue-200";
	return (
		<div className="card font-mono " key={props.id} >
            <div className={`m-2 p-2 border-2 ${backgroundColorClass}`} key={props.id}>
                <h3></h3>
                <p><strong>{props.userName}</strong>: {props.text}</p>
            </div>
        </div >
	)
}
export default Message;