import { Notification } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useSelector, useDispatch } from "react-redux";

const Tostify = () => {
  const { type, message, display } = useSelector((state) => state.ErrorReducer);
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch({ type: "CLOSE_TOSTIFY", message: message });
  };
  if (!display) return <></>;
  return (
    <Notification
      color={type === "error" ? "red" : null}
      title={message}
      icon={type === "error" ? <IconX size={18} /> : null}
      styles={{ root: { position: "absolute", top: 10, right: "45%" } }}
      onClose={closeHandler}
    ></Notification>
  );
};

export default Tostify;
