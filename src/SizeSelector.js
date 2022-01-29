import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import styles from './SizeSelector.module.scss';

const SIZE_PRESETS = [
  [320, 240],
  [480, 320],
  [640, 480],
  [800, 480],
  [1024, 600],
  [1280, 400],
  [1280, 720],
  [1920, 1080]
];

function SizeSelector(props) {
  const sizeText = `${props.value[0]} x ${props.value[1]}`;

  const handleSelected = (e) => {
    const value = JSON.parse(e.currentTarget.dataset.value);
    if (value[0] !== props.value[0] || value[1] !== props.value[1]) {
      props.onChange(value);
    }
  };

  const menuItems = SIZE_PRESETS.map((size) => {
    const [w, h] = size;
    const key = `${w} x ${h}`;
    const selected = w === props.value[0] && h === props.value[1];
    const classes = classNames(
      styles.Menu__item,
      selected ? styles['Menu__item--selected'] : null
    );
    return (
      <div key={key} className={classes} data-value={JSON.stringify(size)} onClick={handleSelected}>{key}</div>
    );
  });

  const menu = (
    <div className={styles.Menu}>
      {menuItems}
    </div>
  );

  return (
    <Dropdown
      trigger={['click']}
      overlay={menu}>
        <div className={styles.Label}>
          {sizeText}
          <span className='material-icons'>arrow_drop_down</span>
        </div>
    </Dropdown>
  );
}

export default SizeSelector;
