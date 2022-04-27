import { FC, useEffect, useRef, useState } from "react";
import {
  ActionsContainer,
  CameraIcon,
  ChatContainer,
  Container,
  Message,
  MessageContainer,
  UserName,
} from "./styles";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BsCameraReelsFill } from "react-icons/bs";
import { socket } from "../../services/socket";
import { IChat } from "../../models/Chat";
import { IStream } from "../../models/Stream";
import { useAuth } from "../../hooks/auth.hook";
import Input from "../Input";
import Button from "../Button";

interface IProps {
  stream?: IStream;
}

const Chat: FC<IProps> = ({ stream }) => {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<IChat[]>([]);
  const [text, setText] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stream) {
      socket.emit("join-chat-room", stream.id);
    }
  }, [stream]);

  socket.on("chat-message", (data: IChat) => {
    setMessages([...messages, data]);
    setTimeout(() => {
      chatContainerRef.current?.scrollTo({
        left: 0,
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  });

  function sendMessage() {
    if (text.trim() !== "" && stream) {
      const data: IChat = {
        roomId: stream?.id,
        userName: user?.name,
        message: text.trim(),
        isHost: user?.id === stream.user.id,
      };
      socket.emit("send-chat-message", data);
      setText("");
    }
  }

  return (
    <Container>
      <ChatContainer ref={chatContainerRef}>
        {messages.map((value, index) => (
          <MessageContainer key={index}>
            {value.isHost && <CameraIcon />}
            <UserName>{value.userName}:</UserName>
            <Message>{value.message}</Message>
          </MessageContainer>
        ))}
      </ChatContainer>
      <ActionsContainer disabled={!isAuthenticated}>
        <Input
          disabled={!isAuthenticated}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onSearch={sendMessage}
        />
        <Button
          style={{ height: 45 }}
          disabled={!isAuthenticated}
          variant="secondary"
          onClick={sendMessage}
        >
          <RiSendPlane2Fill />
        </Button>
      </ActionsContainer>
    </Container>
  );
};

export default Chat;
