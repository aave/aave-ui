import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  .GradientText {
    display: inline-block;
    margin: 0;
    white-space: nowrap;
    span {
      display: block;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

export default staticStyles;
