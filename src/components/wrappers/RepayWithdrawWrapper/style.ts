import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .RepayWithdrawWrapper {
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    margin-bottom: 30px;
    margin-top: 50px;
    @include respond-to(xl) {
      margin-bottom: 20px;
    }
    @include respond-to(lg) {
      margin-bottom: 10px;
    }
    @include respond-to(md) {
      margin-bottom: 20px;
    }
    @include respond-to(sm) {
      margin-top: 0;
      margin-bottom: 40px;
      border-radius: 0;
      position: relative;
      left: -10px;
      width: calc(100% + 20px);
    }

    &__caption {
      padding: 10px 20px;
      @include respond-to(lg) {
        padding: 10px;
      }
      @include respond-to(md) {
        padding: 10px 20px;
      }
      @include respond-to(sm) {
        display: none;
      }
      p {
        font-weight: 600;
        font-size: $regular;
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
    }

    &__content {
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      @include respond-to(lg) {
        padding: 10px;
      }
      @include respond-to(md) {
        padding: 10px 20px;
      }
      @include respond-to(sm) {
        padding: 20px 15px;
        flex-direction: column;
      }

      .Row,
      .HealthFactor {
        @include respond-to(sm) {
          margin-bottom: 14px;
          width: 100%;
        }
      }
    }
  }
`;

export default staticStyles;
