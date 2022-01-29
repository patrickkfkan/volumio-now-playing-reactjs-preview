import styles from './PreviewFrame.module.scss';
import 'react-resizable/css/styles.css';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';

function PreviewFrame(props) {
  const dragResizeParams = useRef(null);
  const [dragging, setDragging] = useState(false);
  const {onDragResize} = props;

  const [w, h] = props.size;
  const wrapperStyles = {
    '--width': w + 'px',
    '--height': h + 'px'
  };

  const startDragResize = (e) => {
    dragResizeParams.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: w,
      startHeight: h,
      axis: e.currentTarget.dataset.resizeAxis
    };
    setDragging(true);
  };

  const endDragResize = useCallback(() => {
    if (dragging) {
      dragResizeParams.current = null;
      setDragging(false);
    }
  }, [dragging, setDragging]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragResizeParams.current === null) {
        return;
      }
      const {startX, startY, startWidth, startHeight, axis} = dragResizeParams.current;
      const newSize = [startWidth, startHeight];
      if (axis === 'x' || axis === 'xy') {
        newSize[0] = ((e.clientX - startX) * 2)+ startWidth;
      }
      if (axis === 'y' || axis === 'xy') {
        newSize[1] = (e.clientY - startY) + startHeight;
      }
      onDragResize(newSize);
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dragging, onDragResize])

  useEffect(() => {
    const handleMouseUp = () => {
      endDragResize();
    }

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [endDragResize]);

  return (
    <div 
      className={classNames(
        styles.Wrapper,
        dragging ? styles['Wrapper--resizing'] : null
      )} 
      style={wrapperStyles}>
        <iframe title='Preview' className={styles.Contents} src={props.src} />
        <div
          className={classNames(
            styles.Wrapper__resizeDraggable,
            styles['Wrapper__resizeDraggable--right']
          )}
          data-resize-axis='x'
          onMouseDown={startDragResize}>
            <span className='material-icons'>more_vert</span>
        </div>
        <div 
          className={classNames(
            styles.Wrapper__resizeDraggable,
            styles['Wrapper__resizeDraggable--bottom']
          )}
          data-resize-axis='y'
          onMouseDown={startDragResize}>
          <span className='material-icons'>more_horiz</span>
        </div>
        <div 
          className={classNames(
            styles.Wrapper__resizeDraggable,
            styles['Wrapper__resizeDraggable--bottomRight']
          )}
          data-resize-axis='xy'
          onMouseDown={startDragResize}>
          <span className='material-icons'>arrow_right</span>
        </div>
    </div>
  );

}

export default PreviewFrame;
