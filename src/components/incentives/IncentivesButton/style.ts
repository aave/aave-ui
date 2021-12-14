import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/vars';

  .IncentivesButton {
    position: relative;
    margin: 4px 0 1px;
    border-radius: $borderRadius;
    &:hover {
      &:after {
        opacity: 0.6;
      }
    }
    &:active {
      &:after {
        opacity: 1;
      }
    }
    &:after {
      content: '';
      position: absolute;
      left: -1px;
      right: -1px;
      top: -1px;
      bottom: -1px;
      border-radius: $borderRadius;
      background: black;
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      padding: 2px 3px;
    }

    &__valueInner {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: $small;
      strong {
        margin: 0 2px 0 4px;
      }
    }
    &__infinity {
      position: relative;
      bottom: 1px;
    }

    &__icons {
      margin-left: 6px;
      display: flex;
      align-items: center;

      .TokenIcon {
        position: relative;
        margin-left: -2px;
        &:nth-of-type(1) {
          z-index: 1;
        }
        &:nth-of-type(2) {
          z-index: 2;
        }
        &:nth-of-type(3) {
          z-index: 3;
        }
        &:nth-of-type(4) {
          z-index: 4;
        }
      }

      .TokenIcon__image {
        margin: 0;
      }
    }

    &__rest {
      font-size: $small;
      margin-left: 6px;
      display: inline-block;
    }
  }
`;

export default staticStyles;
