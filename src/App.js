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

const getInitialPluginInfo = () => {
  return getInitialData('pluginInfo', null);
}

function App() {
  const [size, setSize] = useState([480, 320]);
  const [kioskMode, setKioskMode] = useState(false);
  const [pluginInfo, setPluginInfo] = useState(getInitialPluginInfo());
  const host = getHost();

  const appUrl = pluginInfo ? pluginInfo.appUrl + (kioskMode ? '?kiosk=1' : '') : null;

  return (
    <>
      <AppStartup 
        host={host} 
        pluginInfo={pluginInfo}
        setPluginInfo={setPluginInfo} />
      <div className={styles.Layout}>
        <div className={styles.Layout__toolbar}>
          <Toolbar 
            size={size} 
            onSizeChange={setSize} 
            kioskMode={kioskMode}
            setKioskMode={setKioskMode} />
        </div>
        <div className={styles.Layout__contents}>
          {
          appUrl ? 
            <PreviewFrame 
            src={appUrl} 
            size={size} 
            onDragResize={setSize} />
          :
          null
          }
        </div>
      </div>
    </>
  );
}

export default App;
