/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.span`
cursor: pointer;
color: ${({ reversed, active }) => (reversed
    ? active ? 'white' : '#aaa'
    : active ? 'black' : '#ccc')};
`;

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }: any, ref) => (
    <ButtonWrapper
      {...props}
      active={active}
      reversed={reversed}
      ref={ref}
      className={className}
    />
  ),
);

const IconWrapper = styled.span`
font-size: 18px;
vertical-align: text-bottom;
`;

export const Icon = React.forwardRef(({ className, ...props }: any, ref) => (
  <IconWrapper
    {...props}
    ref={ref}
    className={['material-icons', className].join(' ')}
  />
));

const StyledWrapper = styled.div`
& > * {
  display: inline-block;
}
& > * + * {
  margin-left: 15px;
}
`;

export const Menu = React.forwardRef(({ className, ...props }: any, ref) => (
  <StyledWrapper
    {...props}
    ref={ref}
    className={className}
  />
));

const MenuWrapper = styled.span`
& > div {
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
}
`;

export const Toolbar = React.forwardRef(({ className, ...props }: any, ref) => (
  <MenuWrapper>
    <Menu
      {...props}
      ref={ref}
      className={className}
    />
  </MenuWrapper>
));
