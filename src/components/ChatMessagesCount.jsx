import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ChatMessagesCount = (props) => {
    return (
        <div id="profile-div">            
            <p><strong>Total messages identified: </strong> {props.chatsCount} </p>
        </div>
    );
};
