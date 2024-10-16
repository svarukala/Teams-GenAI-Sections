import React, { useState } from 'react';

import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { getAllChatMessages, getTotalChatMessages, getSectionedChatMessages } from './chatMessages';
import { ProfileData } from './components/ProfileData';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { ChatsBeforeSections } from './components/ChatsBeforeSections';
import { ChatsAfterSections } from './components/ChatsAfterSections';
import leftNavImage from './images/leftnav.png';
import topLabelImage from './images/top-label.png';

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
            });
    }

    return (
        <>
            <h5 className="profileContent">Welcome {accounts[0].name}</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile
                </Button>
            )}
        </>
    );
};


const ChatMessagesContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const [messageCount, setMessageCount] = useState(0);
    const [messageData, setMessageData] = useState(null);
    const [sectionedMessageData, setSectionedMessageData] = useState(null);

    function LoadChatmessages(){
        getTotalChatMessages().then((response) => setMessageCount(response.totalCount));
        getAllChatMessages().then((response) => setMessageData(response));
        //console.log("messageCount: ", messageCount);
    }
    function LoadSectionedChatMessages(){
        getSectionedChatMessages().then((response) => setSectionedMessageData(response));
        //console.log("sectionedMessageData: ", sectionedMessageData);
    }
    
    return (
        <>
            <h5 className="profileContent">Welcome {accounts[0].name}</h5>
            {messageCount ? (
                <p>
                Total chats (1:1 and Group Chats) identified: <strong>{messageCount}</strong>
                </p>
                
            ):(<Button variant="secondary" onClick={LoadChatmessages}>
                Load chat messages
            </Button>)}
            
            <hr></hr>


            {messageCount ? (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ flex: '0 0 auto' }}>
                        <img src={leftNavImage} alt="Left Navigation" style={{ width: '100px' }} />
                    </div>
                    <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={topLabelImage} alt="Top Label" style={{ width: '400px', marginBottom: '20px' }} />
                        <ChatsBeforeSections messageData={messageData}/>
                        <div style={{ textAlign: 'left', marginTop: '20px' }}>
                            <Button variant="secondary" onClick={LoadSectionedChatMessages}>
                                Auto-create Sections
                            </Button>
                        </div>
                    </div>

                    {sectionedMessageData ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ flex: '0 0 auto' }}>
                        <img src={leftNavImage} alt="Left Navigation" style={{ width: '100px' }} onClick={LoadSectionedChatMessages} />
                    </div>
                    <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={topLabelImage} alt="Top Label2" style={{ width: '400px', marginBottom: '20px' }} />

                            <ChatsAfterSections messageData={sectionedMessageData} />

                    </div>
                    </div>) : null}

                    
                </div>
            ) : null}
        </>
    );
};




/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ChatMessagesContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
