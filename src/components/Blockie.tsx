import * as React from "react";
import styled from "styled-components";

interface IBlockieStyleProps {
  size?: number;
}

interface IBlockieProps extends IBlockieStyleProps {
  address: string;
}

const SBlockieWrapper = styled.div<IBlockieStyleProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
  & img {
    width: 100%;
  }
`;

const Blockie = (props: IBlockieProps) => {
  const seed = props.address.toLowerCase() || "";
  const imgUrl = window.blockies
    .create({
      seed,
    })
    .toDataURL();
  return (
    <SBlockieWrapper {...props} size={props.size}>
      <img src={imgUrl} alt={props.address} />
    </SBlockieWrapper>
  );
};

Blockie.defaultProps = {
  address: "0x0000000000000000000000000000000000000000",
  size: 30,
};

export default Blockie;
