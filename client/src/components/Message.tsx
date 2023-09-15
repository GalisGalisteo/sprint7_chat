import React from 'react';

export interface IMessage {
    id: string;
    text: string;
    sentDate: string;
    userName: string;
}

interface Props {
    props: IMessage;
}

const Message: React.FC<Props> = ({ props }) => {
    const backgroundColorClass = 'bg-blue-200';
    const timeSplit = props.sentDate.split('T');
    const timeString = timeSplit[1];
    const time = timeString.split('.')[0];


    return (
        <div className="card font-mono" key={props.id}>
            <div className={`m-2 p-2 border-2 ${backgroundColorClass}`} key={props.id}>
                <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                    <em>{time}</em>&nbsp;&nbsp;<strong>{props.userName}</strong>: {props.text}
                </p>
            </div>
        </div>
    );
};

export default Message;
