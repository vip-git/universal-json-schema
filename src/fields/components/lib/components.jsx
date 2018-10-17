import React from 'react';
import styled from 'react-emotion';

export const Button = styled('span')`
  cursor: pointer;
  background: ${props => props.active ? '#253858' : 'transparent'};
  padding: 5px;
  border-radius: 5px;
  color: ${props =>
    (props.reversed
      ? props.active ? 'white' : '#aaa'
      : props.active ? 'white' : 'black')};
`;

export const Icon = styled(({ className, ...rest }) => <span className={`material-icons ${className}`} {...rest} />)`
  font-size: 18px;
  vertical-align: text-bottom;
`;

export const Menu = styled('div')`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`;

