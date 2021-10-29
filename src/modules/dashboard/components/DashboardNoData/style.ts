import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardNoData {
    @include respond-to(sm) {
      margin-top: 50px;
    }
    .Caption {
      margin-bottom: 50px;
      max-width: 540px;
      @include respond-to(xl) {
        margin-bottom: 25px;
        max-width: 485px;
      }
      @include respond-to(lg) {
        margin-bottom: 20px;
        max-width: 380px;
      }
      @include respond-to(md) {
        margin-bottom: 25px;
        max-width: 485px;
      }
      @include respond-to(sm) {
        margin-bottom: 30px;
      }
    }

    &__markets {
      margin-bottom: 30px;
      padding-bottom: 42px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      @include respond-to(xl) {
        padding-bottom: 17px;
        margin-bottom: 25px;
      }
      @include respond-to(lg) {
        padding-bottom: 12px;
        margin-bottom: 20px;
      }
      @include respond-to(md) {
        padding-bottom: 17px;
        margin-bottom: 25px;
      }
      @include respond-to(sm) {
        padding-bottom: 40px;
        margin-bottom: 30px;
      }

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 400px;
        height: 1px;
        @include respond-to(sm) {
          width: 300px;
        }
      }

      .MarketSelectButton {
        margin: 8px;
        @include respond-to(sm) {
          margin: 9px;
        }
        &__inner {
          width: 120px;
          height: 36px;
          @include respond-to(sm) {
            width: 160px;
            height: 54px;
          }
        }
        &__logo-inner {
          img {
            width: 84px;
            max-height: 16px;
            @include respond-to(sm) {
              width: 105px;
              max-height: 25px;
            }
          }
          span {
            font-size: $small;
            @include respond-to(sm) {
              font-size: $medium;
            }
          }
        }
        &__subLogo {
          height: 36px;
          @include respond-to(sm) {
            height: 54px;
          }
        }
        &__kovan {
          top: 2px;
          right: 2px;
          @include respond-to(sm) {
            top: 3px;
            right: 3px;
          }
        }
        &__marketText {
          font-size: 9px;
          letter-spacing: 6px;
          @include respond-to(sm) {
            font-size: $small;
            letter-spacing: 8px;
          }
        }
      }
    }

    &__bottom--inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &__bottom--text {
      font-size: $large;
      margin-bottom: 30px;
      @include respond-to(xl) {
        font-size: $regular;
        margin-bottom: 20px;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $regular;
        margin-bottom: 20px;
      }
      @include respond-to(sm) {
        margin-bottom: 30px;
      }
    }
  }
`;

export default staticStyles;
