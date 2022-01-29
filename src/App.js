import { useState } from 'react';
import styles from './App.module.scss';
import AppStartup from './AppStartup';
import PreviewFrame from './PreviewFrame';
import Toolbar from './Toolbar';

const getInitialData = (prop, defaultVal) => {
  if (window.__initialData && window.__initialData[prop]) {
    return window.__initialData[prop];
  }
  else {
    return defaultVal;
  }
};

const getUrlSearchParam = (paramName) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(paramName) || null;
};

const getHost = () => {
  return getInitialData('host') || getUrlSearchParam('host');
};

const getNowPlayingUrl = () => {
  return getInitialData('nowPlayingUrl') || getUrlSearchParam('url');
};

function App() {
  const [size, setSize] = useState([480, 320]);
  const host = getHost();
  const nowPlayingUrl = getNowPlayingUrl();
  const appPort = getInitialData('appPort');
  const pluginVersion = getInitialData('pluginVersion');

  return (
    <>
      <AppStartup host={host} appPort={appPort} pluginVersion={pluginVersion} />
      <div className={styles.Layout}>
        <div className={styles.Layout__toolbar}>
          <Toolbar size={size} onSizeChange={setSize} />
        </div>
        <div className={styles.Layout__contents}>
          <PreviewFrame 
            src={nowPlayingUrl} 
            size={size} 
            onDragResize={setSize} />
        </div>
      </div>
    </>
  );
}

export default App;
