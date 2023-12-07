import { Tab, Tabs } from "@mui/material";

type Props = {
  id: any;
  userID: any;
};
const MensagemBtn = ({ id, userID }: Props) => {
  return id != userID ? (
    <>
      <Tabs aria-label="basic tabs example">
        <Tab label="Enviar mensagem" />
      </Tabs>
    </>
  ) : null;
};

export default MensagemBtn;
