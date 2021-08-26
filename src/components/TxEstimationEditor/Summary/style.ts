import css from 'styled-jsx/css';
/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TxEstimationEditor {
    width: 100%;
    margin-top: 5px;
    font-size: $extraSmall;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .Value .Value__value,
    button {
      font-size: $extraSmall;
    }

    &__valuesWrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    &__values {
      display: flex;
      align-items: center;

      .Value {
        margin: 0 2px;
      }
    }

    &__action {
      display: flex;
      align-items: center;

      button {
        margin-left: 5px;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;

// @ts-ignore
export default staticStyles;
