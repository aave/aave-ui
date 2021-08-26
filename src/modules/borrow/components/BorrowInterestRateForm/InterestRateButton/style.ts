import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .InterestRateButton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 25px;
    @include respond-to(xl) {
      margin: 0 20px;
    }
    @include respond-to(lg) {
      margin: 0 15px;
    }
    @include respond-to(md) {
      margin: 0 20px;
    }
    @include respond-to(sm) {
      margin: 0 15px;
    }
    &:after {
      content: '';
      transition: $transition;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: $borderRadius;
      background: rgba(#000, 0.1);
      filter: blur(5px);
    }
    &:disabled {
      cursor: not-allowed;
      .InterestRateButton__image-inner,
      .InterestRateButton__description-inner {
        opacity: 0.2;
      }
      &:after {
        display: none;
      }
    }

    &__inner {
      position: relative;
      z-index: 2;
      border-radius: $borderRadius;
      width: 180px;
      height: 160px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @include respond-to(xl) {
        width: 140px;
        height: 130px;
      }
      @include respond-to(lg) {
        width: 120px;
        height: 115px;
      }
      @include respond-to(md) {
        width: 140px;
        height: 130px;
      }
    }
    &__image-inner {
      margin-bottom: 20px;
      img {
        width: 50px;
        height: 50px;
        @include respond-to(xl) {
          width: 40px;
          height: 40px;
        }
      }
    }
    &__description-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    &__description {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    .InterestRateButton__percent {
      .ValuePercent__value {
        display: flex;
        align-items: center;
      }
    }
  }

  .InterestRateButtonActive {
    &:disabled {
      cursor: default;
      .InterestRateButton__image-inner,
      .InterestRateButton__description-inner {
        opacity: 1;
      }
      &:after {
        display: block;
      }
    }
  }
`;

export default staticStyles;
