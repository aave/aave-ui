import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .StakingTopPanel {
    margin-bottom: 30px;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    padding: 15px 30px;
    display: flex;
    align-items: center;
    @include respond-to(xl) {
      margin-bottom: 20px;
    }
    @include respond-to(lg) {
      padding: 10px 20px;
      margin-bottom: 10px;
    }
    @include respond-to(md) {
      padding: 15px 30px;
      margin-bottom: 20px;
    }
    @include respond-to(sm) {
      padding: 15px 10px;
      margin-bottom: 30px;
      justify-content: space-between;
      border-radius: 0;
      position: relative;
      left: -10px;
      width: calc(100% + 20px);
      display: block;
    }

    &__caption {
      font-size: $regular;
      margin-right: 150px;
      @include respond-to(xl) {
        font-size: $medium;
        margin-right: 130px;
      }
      @include respond-to(lg) {
        font-size: $small;
        margin-right: 30px;
      }
      @include respond-to(md) {
        font-size: $medium;
        margin-right: 100px;
      }
      @include respond-to(sm) {
        display: none;
      }
    }

    &__values {
      display: flex;
      align-items: center;
      @include respond-to(sm) {
        width: 100%;
        justify-content: center;
      }
    }

    &__value-inner {
      display: flex;
      align-items: center;
      margin-right: 80px;
      @include respond-to(lg) {
        margin-right: 50px;
      }
      @include respond-to(sm) {
        display: block;
        text-align: center;
        .Value {
          align-items: center;
        }
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
    &__value-title {
      font-weight: 300;
      margin-right: 20px;
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $medium;
        margin-right: 10px;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        margin: 0 0 5px 0;
        font-size: $small;
        font-weight: 400;
      }
    }
  }
`;

export default staticStyles;
