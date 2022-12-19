import React from "react";
import styled from "styled-components";
import logo from "../assets/Nucleus-Bg-New.png";

export type NucleusLogoProps = React.ComponentPropsWithoutRef<"img">;

const Logo = styled.img`
  width: 272px;
  height: auto;
  padding: 10px;
`;

export default function NucleusLogo(props: NucleusLogoProps) {
  return <Logo {...props} src={logo} alt="Nucleus Logo" />;
}
