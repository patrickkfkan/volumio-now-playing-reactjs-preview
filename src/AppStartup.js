import { useEffect, useState } from 'react';
import io from "socket.io-client";

const refresh = () => {
  window.location.reload();
};

function AppStartup(props) {
  const {host, appPort, pluginVersion} = props;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (host) {
      const _socket = io.connect(host, { autoConnect: false });
      setSocket(_socket);

      return (() => {
        _socket.disconnect();
      });
    }
  }, [host]);

  useEffect(() => {
    if (socket) {
      const onSocketConnected = () => {
        socket.emit("callMethod", {
          endpoint: "user_interface/now_playing",
          method: "broadcastPluginInfo",
        });
      };

      const onPluginInfo = (info) => {
        if (appPort && `${info.appPort}` !== `${appPort}`) {
          const href = window.location.href.replace(
            `:${appPort}`,
            `:${info.appPort}`
          );
          window.location.href = href;
        } else if (pluginVersion && info.pluginVersion !== pluginVersion) {
          refresh();
        }
      };

      ['connect', 'reconnect'].forEach(event => {
        socket.on(event, onSocketConnected);
      });

      socket.on('nowPlayingPluginInfo', onPluginInfo);
      socket.connect();

      return () => {
        ['connect', 'reconnect'].forEach(event => {
          socket.off(event, onSocketConnected);
        });

        socket.off('nowPlayingPluginInfo', onPluginInfo);
      }
    }
  }, [socket, appPort, pluginVersion]);

  return null;
}

export default AppStartup;