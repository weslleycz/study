import { Tab, Tabs } from "@mui/material";

type Props = {
  id: any;
  userID: any;
  onClick: any;
};
const MensagemBtn = ({ id, userID, onClick }: Props) => {
  return id != userID ? (
    <>
      <Tabs aria-label="basic tabs example">
        <Tab onClick={() => onClick()} label="Enviar mensagem" />
      </Tabs>
    </>
  ) : null;
};

export default MensagemBtn;
