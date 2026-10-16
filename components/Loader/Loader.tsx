import { Oval } from 'react-loader-spinner';

import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.wrapper}>
      <Oval
        visible
        height={72}
        width={72}
        color="var(--color-green-hover)"
        secondaryColor="var(--color-inputs)"
        strokeWidth={4}
        ariaLabel="loading"
        
      />
    </div>
  );
}