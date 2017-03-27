import styled from 'styled-components'

export const white = '#FBFBFF';
export const baseSize = '5vw';
export const fontFamilyBase = '\'Sniglet\', cursive';
export const fontFamilyLogo = '\'Londrina Outline\', cursive';
export const fontFamilyButton = '\'Londrina Outline\', cursive';

export const Screen = styled.div`
  align-items: stretch;
  background-color: ${white};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: ${baseSize};
  text-align: center;
  width: 100%;
`

export const Button = styled.button`
  background: none;
  border: 3px dashed #333;
  font-family: ${fontFamilyButton};
  width: 100%;
  height: 10vh;
  font-size: 10vw;
  text-transform: uppercase;
`

export const Caption = styled.h3`
  font-size: 6vw;
  text-transform: uppercase;
  letter-spacing: .5vw;
  font-family: ${fontFamilyBase};
`
