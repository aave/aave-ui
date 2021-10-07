import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReserveStatusGraph {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    @include respond-to(sm) {
      order: 0;
    }
    &:after {
      content: '';
      position: absolute;
      width: 195px;
      height: 195px;
      left: 50%;
      top: 49%;
      transform: translate(-50%, -50%);
      border-width: 20px;
      border-style: solid;
      border-radius: 50%;
      @include respond-to(xl) {
        width: 152px;
        height: 152px;
        border-width: 15px;
      }
      @include respond-to(lg) {
        width: 120px;
        height: 120px;
        border-width: 14px;
      }
      @include respond-to(md) {
        width: 152px;
        height: 152px;
        border-width: 15px;
      }
      @include respond-to(sm) {
        width: 195px;
        height: 195px;
        border-width: 20px;
        top: 47%;
      }
    }

    &__inner {
      position: relative;
      width: 270px;
      z-index: 2;
      @include respond-to(xl) {
        width: 220px;
      }
      @include respond-to(lg) {
        width: 180px;
      }
      @include respond-to(md) {
        width: 220px;
      }
      @include respond-to(sm) {
        width: 270px;
        margin-bottom: 10px;
      }

      > div {
        &:first-of-type {
          min-height: 205.75px !important;
          height: 205.75px !important;
          @include respond-to(xl) {
            min-height: 164.083px !important;
            height: 164.083px !important;
          }
          @include respond-to(lg) {
            min-height: 130.75px !important;
            height: 130.75px !important;
          }
          @include respond-to(md) {
            min-height: 164.083px !important;
            height: 164.083px !important;
          }
          @include respond-to(sm) {
            min-height: 205.75px !important;
            height: 205.75px !important;
          }
        }
      }
    }

    .ReserveStatusGraph__icon {
      position: absolute;
      top: 49%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        margin-right: 0 !important;
      }

      .MultipleIcons {
        margin-right: 0 !important;
      }
    }
  }
`;

export default staticStyles;
