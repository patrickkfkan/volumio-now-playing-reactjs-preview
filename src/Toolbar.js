import SizeSelector from './SizeSelector';
import styles from './Toolbar.module.scss';

function Toolbar(props) {
  const rotate = () => {
    props.onSizeChange([props.size[1], props.size[0]]);
  };

  return (
    <div className={styles.Layout}>
      <span className={styles.Title}>Volumio Now Playing (Preview): </span>
      <SizeSelector value={props.size} onChange={props.onSizeChange} />
      <button className={styles.RotateButton} onClick={rotate}>
        <span className='material-icons'>screen_rotation</span>
      </button>
    </div>
  );
}

export default Toolbar;