import React from 'react';

import { PortalBox } from '../../interfaces/box';
import Button from '../../commons/components/component.button';

const Box: React.FC<PortalBox> = props => {
  const { name } = props;
  return (
    <div>
      <Button onClick={() => {}} type='button' className=''>
        {name}
      </Button>
    </div>
  );
};
export default Box;
