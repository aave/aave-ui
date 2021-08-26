import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TextFAQLink {
    margin: 60px auto 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 5;
    @include respond-to(xl) {
      margin: 60px auto;
    }

    .TextFAQLink__link {
      border-radius: $borderRadius;
      padding: 5px 40px;
      &:hover {
        opacity: 0.7;
      }

      span {
        font-size: $medium;
        margin-right: 20px;
        @include respond-to(xl) {
          font-size: $small;
        }
      }
    }

    .TextFAQLink__arrow {
      width: 9px;
      height: 9px;
      &:after {
        width: 12px;
      }
    }
  }
`;

export default staticStyles;
