import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ProposalsItem {
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    margin-bottom: 10px;
    padding: 15px 50px 15px 20px;
    display: block;
    width: 100%;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    transition-property: box-shadow, border;
    &:hover {
      z-index: 2;
    }
    @include respond-to(xl) {
      padding: 10px 20px;
    }
    @include respond-to(md) {
      padding: 10px 10px 20px 10px;
    }
    @include respond-to(sm) {
      margin: 10px 0 0 0;
    }
    &:last-of-type {
      margin-bottom: 0;
      @include respond-to(sm) {
        margin-bottom: 10px;
      }
    }

    &__left-inner {
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      max-width: 42%;
      @include respond-to(lg) {
        max-width: 52%;
      }
      @include respond-to(md) {
        max-width: 100%;
        margin-bottom: 25px;
      }
      h3 {
        margin-bottom: 10px;
        font-size: $large;
        font-weight: 400;
        word-break: break-word;
        @include respond-to(xl) {
          font-size: $regular;
        }
        @include respond-to(lg) {
          font-size: $medium;
        }
        @include respond-to(md) {
          font-size: $regular;
        }
      }
    }

    &__info {
      display: flex;
      align-items: center;
    }

    &__id {
      font-size: $regular;
      margin-right: 30px;
      white-space: nowrap;
      @include respond-to(xl) {
        font-size: $small;
        margin-right: 10px;
      }
      span {
        margin-left: 5px;
        font-weight: 600;
      }
    }

    &__timeLeft {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      span {
        margin-right: 5px;
      }
    }

    &__right-inner {
      display: inline-block;
      width: 100%;
      max-width: 55%;
      margin-left: 3%;
      vertical-align: middle;
      @include respond-to(lg) {
        max-width: 45%;
        margin-left: 3%;
      }
      @include respond-to(md) {
        max-width: 100%;
        margin: 0;
      }
    }
  }
`;

export default staticStyles;
