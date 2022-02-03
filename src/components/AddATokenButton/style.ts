import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AddATokenButton {
    border-radius: 4px;
  border: solid 1px #7159ff;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    padding: 11px 15px 9px;
    margin-top: 15px;
    padding: 6px 10px;
    font-size: $small;

    @include respond-to(xl) {
      margin-top: 12px;
      padding: 5px 8px;
      font-size: $extraSmall;
    }

    @include respond-to(sm) {
      padding: 6px 10px;
      font-size: $small;
      align-self: center;
    }
    &__title {
      font-family: Montserrat;
      font-size: 12px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #131313;

    }

    &:active {
      .AddATokenButton__circle {
        transform: scale(0.9);
      }
    }

    &:disabled {
      &:hover,
      &:active {
        box-shadow: $boxShadow;
        .AddATokenButton__circle {
          transform: scale(1);
        }
      }
    }

    &__circle {
      width: 20px;
      height: 20px;
      margin-left: 7px;
      border-radius: 50%;
      position: relative;
      transition: $transition;
      display: flex;
      align-self: center;
      justify-content: center;
      @include respond-to(xl) {
        width: 16px;
        height: 16px;
      }
      @include respond-to(sm) {
        width: 20px;
        height: 20px;
      }
      &:after,
      &:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: $borderRadius;
      }
      &:after {
        width: 10px;
        height: 2px;
        @include respond-to(xl) {
          width: 8px;
        }
        @include respond-to(sm) {
          width: 10px;
        }
      }
      &:before {
        width: 2px;
        height: 10px;
        @include respond-to(xl) {
          height: 8px;
        }
        @include respond-to(sm) {
          height: 10px;
        }
      }
    }
  }
`;

export default staticStyles;
