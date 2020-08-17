import React, {
  useState,
  useContext,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { css } from 'emotion';
import styled from '@emotion/styled';

const NotificationContext = React.createContext();

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1000;
  padding: 1em;
  width: 20em;
`;

const notificationStyle = css`
  border-radius: 0.3em;
  padding: 1em 2em;
  position: relative;
  margin-top: 0.45em;

  &:hover,
  &:focus-within {
    transform: scale(1.05);
  }
`;

export const Danger = styled.div`
  ${notificationStyle};
  background: #dc3000;
  color: #fff;
`;

export const Warning = styled.div`
  ${notificationStyle};
  background: #fc0;
  color: #000;
`;

export const Info = styled.div`
  ${notificationStyle};
  background: #0cf;
  color: #000;
`;

const XButton = styled.button`
  background: #000;
  border: 1px solid #fff;
  border-radius: 10em;
  width: 1.5em;
  height: 1.5em;
  color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

function CloseButton({ onClick }) {
  return <XButton onClick={onClick}>&times;</XButton>;
}

export function NotificationProvider({ children }) {
  const timeoutsRef = useRef([]);

  const [_notifications, setNotifications] = useState([]);

  const autoCloseNotifications = useCallback(() => {
    const newNotifications = [..._notifications].filter(
      (n) => !n.expiresAfter || n.expiresAfter > new Date()
    );

    if (newNotifications.length !== _notifications.length) {
      setNotifications(newNotifications);
    }
  }, [_notifications]);

  const removeByIndex = useCallback(
    (index) => {
      const newNotifications = [..._notifications];
      newNotifications.splice(index, 1);
      setNotifications(newNotifications);
    },
    [_notifications]
  );

  useEffect(() => {
    autoCloseNotifications();

    return () => {
      // This doesn't depend on the DOM node
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [autoCloseNotifications, removeByIndex]);

  const notifications = useMemo(
    () =>
      _notifications.map((n, i) => ({
        ...n,
        removeNotification: () => removeByIndex(i),
      })),
    [_notifications, removeByIndex]
  );

  const addNotification = (text, renderer = Info, autoClose = 3000) => {
    setNotifications(
      [...notifications].concat({
        text,
        renderer,
        expiresAfter: autoClose && new Date(new Date().getTime() + autoClose),
      })
    );

    timeoutsRef.current.push(
      setTimeout(() => autoCloseNotifications(), autoClose)
    );
  };

  const context = {
    notifications,
    setNotifications,
    addNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}

export default function Notifications() {
  const { notifications } = useContext(NotificationContext);
  return (
    <NotificationContainer>
      {notifications.map(
        (
          { text, renderer: Renderer, removeNotification, ...otherProps },
          i
        ) => (
          <Renderer key={i} {...otherProps}>
            <CloseButton onClick={removeNotification} />
            {text}
          </Renderer>
        )
      )}
    </NotificationContainer>
  );
}
