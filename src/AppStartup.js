import { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";

const refresh = () => {
  window.location.reload();
};

function AppStartup(props) {
  const {host, pluginInfo, setPluginInfo} = props;
  const [socket, setSocket] = useState(null);
  const currentPluginInfo = useRef(props.pluginInfo);

  useEffect(() => {
    if (host) {
      const _socket = io.connect(host, { autoConnect: false });
      setSocket(_socket);

      return (() => {
        _socket.disconnect();
      });
    }
  }, [host, setSocket]);

  useEffect(() => {
    if (socket) {
      const onSocketConnected = () => {
        socket.emit("callMethod", {
          endpoint: "user_interface/now_playing",
          method: "getPluginInfo",
        });
      };

      const onPluginInfo = (info) => {
        const current = currentPluginInfo.current;
        if (!current || (`${info.appPort}` !== `${current.appPort}` ||
          info.version !== current.version ||
          info.appUrl !== current.appUrl ||
          info.apiPath !== current.apiPath)) {
            setPluginInfo(info);
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
  }, [socket, setPluginInfo]);

  useEffect(() => {
    // Plugin info updated - compare and decide whether to reload
    if (pluginInfo && currentPluginInfo.current) {
      const current = currentPluginInfo.current;
      if (pluginInfo.previewUrl !== current.previewUrl && 
        window.location.href.startsWith(current.previewUrl)) {
          window.location.href = pluginInfo.previewUrl;
      }
      else if (pluginInfo.version !== current.version) {
        refresh();
      }
    }
    currentPluginInfo.current = pluginInfo;
  }, [pluginInfo]);

  return null;
}

export default AppStartup;