import React from 'react';

import { PortalBox } from '../../interfaces/box';

import styled from '@emotion/styled'

const Button = styled.button`
  color: black;
  background-color: green;
  width: 137px;
  height: 137px;
`
const Boxx: React.FC<PortalBox> = ((props) => {
    return (
        <div>
      
                <Button>

                    {props.name}
                </Button>
            

        </div>
    )
})
export default Boxx;