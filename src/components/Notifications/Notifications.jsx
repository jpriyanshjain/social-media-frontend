import { useState, useEffect, useRef } from "react";
import { Tooltip } from "@mantine/core";
import { IconBell } from "@tabler/icons";
import { Popover, ArrowContainer } from "react-tiny-popover";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification";
import { socket } from "../../utils/socketIo";
import { updateNotification } from "../../actions/UserAction";
import "./Notification.css";

const Notifications = () => {
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { Notifications } = useSelector(
    (state) => state.authReducer.authData.user
  );
  const { user } = useSelector((state) => state.authReducer.authData);

  const [count, setCount] = useState(0);
  let openFirstTime = useRef(true);

  useEffect(() => {
    const unseenMessage = Notifications?.reduce(
      (acc, curr) => (curr.seen === true ? acc : acc + 1),
      0
    );
    setCount(unseenMessage);
  }, [Notifications]);

  useEffect(() => {
    if (open && openFirstTime.current) {
      const updatedNotification = Notifications?.map((notification) => ({
        ...notification,
        seen: true,
      }));
      openFirstTime.current = false;
      dispatch(updateNotification(user._id, updatedNotification));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    socket.on("receive-notification", (data) => {
      dispatch({ type: "RECEIVED-NOTIFICATION", data: data });
    });
  }, [dispatch]);

  return (
    <div className="notification-container">
      <p className="notification-count">{count}</p>
      <Popover
        isOpen={open}
        onClickOutside={() => setOpen(false)}
        positions={["bottom", "top", "right", "left"]}
        padding={10}
        content={({ position, childRect, popoverRect }) => (
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={"black"}
            arrowSize={10}
            arrowStyle={{ opacity: 0.7, display: "none" }}
            arrowClassName="popover-arrow"
            style={{
              background: "white",
              borderRadius: 8,
              width: 200,
              maxHeight: 500,
              overflow: "auto",
            }}
          >
            {Notifications?.map((notification) => (
              <Notification data={notification} key={notification._id} />
            ))}
          </ArrowContainer>
        )}
      >
        <Tooltip label="Notification" position="left-start" withArrow>
          <div onClick={() => setOpen((perv) => !perv)}>
            <IconBell />
          </div>
        </Tooltip>
      </Popover>
    </div>
  );
};

export default Notifications;
