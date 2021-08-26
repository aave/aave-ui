import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SwitcherWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
    @include respond-to(md) {
      margin-top: 0;
      margin-bottom: 40px;
    }

    &__title {
      font-size: $small;
      font-weight: 300;
      margin-bottom: 7px;
      @include respond-to(md) {
        margin-bottom: 10px;
        font-size: $regular;
      }
    }

    .LabeledSwitch {
      p {
        span {
          position: relative;
          top: 1px;
        }
      }
    }

    &__uppercase {
      .LabeledSwitch {
        p {
          span {
            text-transform: uppercase;
          }
        }
      }
    }
  }
`;

export default staticStyles;
