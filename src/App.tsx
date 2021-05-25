import { FC, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import "./styles.css"
import { Button, Input, Layout, Breadcrumb, Form } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Message } from "./Message"
import { db } from "./firebase"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { MessageType } from "./types"
import firebase from 'firebase/app'


const { Header, Content, Footer } = Layout;

export const App: FC = () => {

  const [input, setInput] = useState("")
  const [userName, setUserName] = useState("unknown")

  const messagesRef = db.collection("messages")
  const query = messagesRef.orderBy('createdAt')
  const [messages]: [MessageType[] | undefined, boolean, Error | undefined] = useCollectionData<MessageType>(query, { idField: 'id' })


  useEffect(() => {
    const userNamePrompt = prompt("Please enter your name")
    if (userNamePrompt) {
      setUserName(userNamePrompt)
    }
  }, [])

  const sendMessage = async () => {

    await messagesRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      text: input,
      userName: userName
    })

    setInput("")
  }

  return (
    <div >
      <Layout className="layout">
        <Header className="site-page-header">
          <div className="logo" />
          <h1>💬 Messenger</h1>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>

          </Breadcrumb>
          <h2>Hello, {userName}</h2>
          <div className="site-layout-content">
            {messages && messages.map((message) => {
              return (

                <Message key={Math.random()} loggedInUserName={userName} messageObj={message} />
              )
            })}


          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Form.Provider >
            <Form onFinish={sendMessage}>
              <div >
                <Input
                  value={input}
                  onChange={evt => setInput(evt.target.value)}
                  style={{ width: 200 }}
                />
                <Button
                  disabled={!input}
                  onClick={sendMessage}
                  type="primary"
                  icon={<SendOutlined />}>Send
                </Button>
              </div>
            </Form>
          </Form.Provider>
        </Footer>
      </Layout>

    </div>
  );
}
