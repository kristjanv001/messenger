import { MessageType } from "./types"

type MessageProps = {
  messageObj: MessageType
  loggedInUserName: string
}


export const Message = ({ messageObj, loggedInUserName }: MessageProps) => {
  const { text, userName } = messageObj
  // console.log(loggedInUserName)
  return (
    <div className={`message-card ${userName === loggedInUserName && "message-card-user"}`}  >
      <span className={`message ${userName === loggedInUserName ? 'message-user' : 'message-partner'}`}>
        {text}
      </span>
      <span>
        {" "}
        {userName}
      </span>
    </div>




  )
}
