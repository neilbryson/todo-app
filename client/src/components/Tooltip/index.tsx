import React, { ReactElement, ReactFragment, ReactNode, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: ReactNode;
  text: string;
}

type DOMRectObj = Omit<Record<keyof DOMRect, number>, 'toJSON'>;

const tooltipRoot = document.getElementById('tooltip-root');
const initialRect: DOMRectObj = {
  bottom: 0,
  height: 0,
  left: 0,
  top: 0,
  right: 0,
  x: 0,
  y: 0,
  width: 0,
};

const Tooltip = ({ children, text }: Props): ReactElement<ReactFragment> | null => {
  const [isShown, setIsShown] = useState(false);
  const [rect, setRect] = useState<DOMRectObj>(initialRect);
  const cbRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      let left = rect.left + (rect.width - node.offsetWidth) / 2;
      if (left < 0) left = 0;

      const top = rect.top + rect.height;

      node.style.left = `${left}px`;
      node.style.top = `${top}px`;
    },
    [rect]
  );

  const show = useCallback((e: React.MouseEvent) => {
    const target = e.target;
    if (target instanceof HTMLElement) {
      setRect(target.getBoundingClientRect().toJSON());
      setIsShown(true);
    }
  }, []);
  const hide = useCallback(() => {
    setRect(initialRect);
    setIsShown(false);
  }, []);

  if (children === null || children === undefined) return null;

  if (!tooltipRoot) {
    // eslint-disable-next-line no-console
    console.warn('Missing #tooltip-root element! Please add it outside the React root.');
    return <>{children}</>;
  }

  const renderChildren = (): ReactElement => {
    // Mark elements with "withTooltip" for tracking
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        'data-with-tooltip': 'true',
        onMouseOver: show,
        onMouseOut: hide,
      });
    }
    return (
      <span onMouseOver={show} onMouseOut={hide} data-with-tooltip="true">
        {children}
      </span>
    );
  };

  const renderTooltip = () => {
    return (
      <div style={{ position: 'fixed' }} ref={cbRef}>
        {text}
      </div>
    );
  };

  // Leave the original structure of the children intact
  return (
    <>
      {renderChildren()}
      {isShown && ReactDOM.createPortal(renderTooltip(), tooltipRoot)}
    </>
  );
};

export default Tooltip;
