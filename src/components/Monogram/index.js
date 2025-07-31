import classNames from 'classnames';
import { useId } from 'hooks';
import './index.css';

function Monogram({ highlight, className, ...props }) {
  const id = useId();
  const clipId = `monogram-clip-${id}`;

  return (
    <svg
      aria-hidden
      className={classNames('monogram', className)}
      width="46"
      height="29"
      viewBox="0 0 46 29"
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M40 0 L15 11 L25 11 L24 14 L5 29 L30 18 L20 18 L21 15 L40 0 Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className="monogram__highlight" width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
}

export default Monogram;
