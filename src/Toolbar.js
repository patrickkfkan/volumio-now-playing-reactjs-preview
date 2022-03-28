import { useCallback } from 'react';
import SizeSelector from './SizeSelector';
import styles from './Toolbar.module.scss';

function Toolbar(props) {
  const rotate = () => {
    props.onSizeChange([props.size[1], props.size[0]]);
  };

  const setKioskMode = props.setKioskMode;

  const handleKioskModeChange = useCallback((e) => {
    setKioskMode(e.target.checked);
  }, [setKioskMode]);

  return (
    <div className={styles.Layout}>
      <span className={styles.Title}>Volumio Now Playing (Preview): </span>
      <SizeSelector value={props.size} onChange={props.onSizeChange} />
      <button className={styles.RotateButton} onClick={rotate}>
        <span className='material-icons'>screen_rotation</span>
      </button>
      <label className={styles.KioskModeCheckBox}>
        <input
          name="kioskMode"
          type="checkbox"
          checked={props.kioskMode}
          onChange={handleKioskModeChange} />
        Kiosk mode
      </label>
    </div>
  );
}

export default Toolbar;
