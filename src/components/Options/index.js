import {Component} from 'react'
import './index.css'

class OptionsContent extends Component {
  renderDefault = () => {
    const {options} = this.props
    // console.log(options)

    return (
      <ul className="Default-list">
        {options.map(eachOption => {
          const {changeOption, activeOption} = this.props
          const onClickOption = () => {
            changeOption(eachOption.idOption)
            console.log(eachOption.idOption)
          }

          const optionClassName =
            activeOption === eachOption.idOption
              ? 'active-btn-default Default-list-item'
              : 'Default-list-item'

          return (
            <li
              key={eachOption.idOption}
              className={optionClassName}
              onClick={onClickOption}
            >
              <button type="button" className="default-btn" value={eachOption}>
                {eachOption.text}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  // renderSingleOptions = () => {
  //   const {options} = this.props

  //   return (
  //     <div className="single-option-container">
  //       <select className="single-option">
  //         {options.map(eachOption => {
  //           const {onChangeSingleOption, activeOption} = this.props
  //           const onChangeOfValue = event => {
  //             onChangeSingleOption(event.target.value)
  //             console.log(event.target.value)
  //             console.log(eachOption.idOption)
  //           }

  //           const activeOptionClassName =
  //             activeOption === eachOption.idOption ? 'single-option-text' : ''
  //           return (
  //             <option
  //               key={eachOption.optionId}
  //               value={eachOption}
  //               className={activeOptionClassName}
  //               onChange={onChangeOfValue}
  //             >
  //               {eachOption.text}
  //             </option>
  //           )
  //         })}
  //       </select>
  //     </div>
  //   )
  // }
  renderSingleOptions = () => {
    const {options, onChangeOption} = this.props

    const onChangeOfValue = event => {
      const selectedOptionId = event.target.value
      onChangeOption(selectedOptionId)
      console.log('HELOO')
    }

    return (
      <div className="single-option-container">
        <select className="single-option" onChange={onChangeOfValue}>
          {options.map(eachOption => {
            const {activeOption} = this.props

            const activeOptionClassName =
              activeOption === eachOption.idOption ? 'single-option-text' : ''
            return (
              <option
                key={eachOption.optionId}
                value={eachOption.optionId}
                className={activeOptionClassName}
              >
                {eachOption.text}
              </option>
            )
          })}
        </select>
      </div>
    )
  }

  renderImage = () => {
    const {options} = this.props

    return (
      <ul className="Image-options-container">
        {options.map(eachOptions => {
          const {changeOption, activeOption} = this.props
          const onClickImage = () => {
            changeOption(eachOptions.idOption)
          }

          const activeImageClassName =
            activeOption === eachOptions.idOption
              ? 'active-image-class'
              : 'image-list-item'
          return (
            <li onClick={onClickImage} className={activeImageClassName}>
              <button type="button" className="options-btn">
                <img
                  key={eachOptions.id}
                  src={eachOptions.imageUrl}
                  className="image-options"
                  alt={eachOptions.text}
                />
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {optionType} = this.props

    switch (optionType) {
      case 'DEFAULT':
        return this.renderDefault()
      case 'SINGLE_SELECT':
        return this.renderSingleOptions()
      case 'IMAGE':
        return this.renderImage()
      default:
        return null
    }
  }
}

export default OptionsContent
