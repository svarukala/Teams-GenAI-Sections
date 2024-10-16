import React from "react";
import { useEffect, useRef } from 'react';
import "./CustomStyle.css";
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    makeStyles,
    Text
  } from "@fluentui/react-components";

const useStyles = makeStyles({
container: {
    gap: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: "128px",
},
text: {
  width: "512px",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  textAlign: "left",
  fontSize: "12px",
  paddingLeft: "20px",
},
innerDiv: {
  width: "512px",
  wordWrap: "break-word",
  textAlign: "left",
  fontSize: "15px",
  paddingLeft: "20px",
}
});
/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ChatsAfterSections = (props) => {
    const classes = useStyles();

    const attachEventListeners = () => {
      console.log("Attaching event listeners");
      const handleClick = (event) => {
        const idParts = event.target.parentElement.id.split('-');
        const chatId = idParts.slice(2).join('-');
        console.log("Clicked chatId: ", chatId);
        event.target.parentElement.style.fontWeight = event.target.parentElement.style.fontWeight === 'bold' ? 'normal' : 'bold';
        
        const beforeSectionHeader = document.getElementById(`before-section-${chatId}`);
        if (beforeSectionHeader) {
          beforeSectionHeader.style.fontWeight = beforeSectionHeader.style.fontWeight === 'bold' ? 'normal' : 'bold';
        }
        else console.log("beforeSectionHeader not found");
      };
  
      const headers = document.querySelectorAll('[id^="after-section-"]');
      headers.forEach(header => {
        header.addEventListener('click', handleClick);
      });

      return () => {
        headers.forEach(header => {
          header.removeEventListener('click', handleClick);
        });
      };

    };
  
    useEffect(() => {
      console.log("useEffect called");

      const cleanup = attachEventListeners();
      return cleanup;
    }, [props.messageData]); 


    return (
        <div>
        {props.messageData.map((message, index) => (
            <Accordion collapsible key={index} style={{paddingLeft:'20px'}}>
            <AccordionItem value={String(index)} className="accordion-item-hover">
              <AccordionHeader>{message.section}</AccordionHeader>
              <AccordionPanel>
              <div className={classes.innerDiv}>

              {message.conversations.map((conversation, idx) => (
                <Accordion collapsible key={idx+100}>
                  <AccordionItem value={String(idx+100)}>
                      <AccordionHeader  
                        id={`after-section-${conversation.chatId}`}
                      >
                      {conversation.topicTitle}
                      </AccordionHeader>
                    <AccordionPanel>
                      <Text className={classes.text}>Participants: {conversation.participants.join(', ')}</Text><br/>                      
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}

              </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
        
        </div>

/** 
<div id="profile-div">
            {props.messageData.map((message, index) => (
                <div key={index}>
                    <p><strong>ChatId: </strong> {message.id}</p>
                    <p><strong>Chat Content: </strong> {message.chatContent}</p>
                    <p><strong>Participants: </strong> {message.participants.join(', ')}</p>
                </div>
            ))}
        </div>
        */
    );
};
