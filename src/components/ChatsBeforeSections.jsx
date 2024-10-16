import React from "react";
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
  width: "520px",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  textAlign: "left",
  fontSize: "12px",
  paddingLeft: "20px",
},
focus:{
    fontWeight: "bold",
}  
});
/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ChatsBeforeSections = (props) => {
    const classes = useStyles();

    return (
        <div>
        {props.messageData.map((message, index) => (
            <Accordion collapsible key={index} style={{paddingLeft:'20px'}}>
            <AccordionItem value={String(index)} className="accordion-item-hover">
              <AccordionHeader id={`before-section-${message.chatId}`} >
                {message.participants.join(', ')}
              </AccordionHeader>
              <AccordionPanel>
              <div className={classes.container}>
                <Text className={classes.text}>
                  {message.chatContent}
                </Text>
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
