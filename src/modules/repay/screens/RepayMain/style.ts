import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .RepayMain {
    &__buttons-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      .RepayMain__link {
        position: relative;
        margin-right: 50px;
        @include respond-to(xl) {
          margin-right: 30px;
        }
        &:last-of-type {
          margin-right: 0;
        }
        &:hover,
        &:disabled {
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
          filter: blur(3px);
          opacity: 0;
          transition: $transition;
        }

        p {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: $borderRadius;
          box-shadow: $boxShadow;
          position: relative;
          z-index: 2;
          width: 200px;
          height: 120px;
          padding: 5px 30px;
          font-size: $large;
          @include respond-to(xl) {
            width: 140px;
            height: 70px;
            padding: 5px 10px;
            font-size: $medium;
          }
          @include respond-to(lg) {
            width: 120px;
            height: 60px;
            font-size: $small;
          }
          @include respond-to(md) {
            width: 140px;
            height: 70px;
            font-size: $medium;
          }
          @include respond-to(sm) {
            height: 100px;
          }
        }
      }
    }
  }
`;

export default staticStyles;
