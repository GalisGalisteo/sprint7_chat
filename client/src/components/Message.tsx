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
				<h3>{props.userName}</h3>
				<p>Message: {props.text}</p>
				<p>Date: {props.sentDate}</p>
			</div>
		</div >
	)
}
export default Message;