import chatMessages from './ChatsData/MergedChatMessages.json';
import sectionedData from './ChatsData/SectionedChatMessages.json';

import csv from 'csvtojson';

export async function getTotalChatMessages() {
    console.log("Entering getTotalChatMessages");
    const messages = chatMessages; // Directly use the imported JSON data
    const totalCount = messages.length;
    console.log("Total messages identified: ", totalCount);
    var jsonResponse = { "totalCount": totalCount };
    return jsonResponse;
}


export async function getAllChatMessages() {
    console.log("Entering getAllChatMessages");
    const messages = chatMessages; // Directly use the imported JSON data
    console.log("Total messages retrieved: ", messages.length);
    return messages;
}




export async function getSectionedChatMessages() {
    console.log("Entering getSectionedChatMessages");
    console.log("sectionedData:", sectionedData); // Log the content of sectionedData

    // Transform the sectionedData object into an array
    const sectionedMessages = Object.keys(sectionedData).map(key => ({
        section: key,
        conversations: sectionedData[key].conversations
    }));

    const messages = chatMessages; // Directly use the imported JSON data

    console.log("Total sectioned messages retrieved: ", sectionedMessages.length);
    if (!Array.isArray(sectionedMessages)) {
        console.error("sectionedMessages is not an array");
        return [];
    }

    const enhancedSectionedMessages = sectionedMessages.map(section => {
        const enhancedConversations = section.conversations.map(conversation => {
            const matchedMessage = messages.find(message => message.id === conversation.id);
            if (matchedMessage) {
                return {
                    ...conversation,
                    chatcontent: matchedMessage.chatContent,
                    participants: matchedMessage.participants,
                    chatId: matchedMessage.chatId
                };
            }
            return conversation;
        });
        return {
            ...section,
            conversations: enhancedConversations
        };
    });

    console.log("Enhanced sectioned messages retrieved: ", enhancedSectionedMessages);
    return enhancedSectionedMessages;
}