/**
 * Created by weihy36 on 2020-7-16
 */
/**
 * 滚动数字 (依赖jq)
 * @param el 用来显示滚动字幕的容器class 或 id
 * @param option 配置参数 width: 数字的宽 (无单位),fontSize: 字体大小（无单位）, color: 文字颜色,autoSizeContainerWidth: 自动计算容器宽度
 * @returns {Object}
 */
import $ from 'jquery'

export function ScrollNumber (el, option) {
  this.container = $(el)
  this.option = option
  this.container.css({
    position: 'relative',
    padding: '0',
    overflow: 'hidden'
  })
  var height = this.container.height()
  this.subWidth = option.width
  this.subHeight = height
  this.autoSizeContainerWidth = option.autoSizeContainerWidth
  this.background = option.background
  this.col = '<span class="g-num-item" style="top: 0;">' +
      '<i>0</i>' +
      '<i>1</i>' +
      '<i>2</i>' +
      '<i>3</i>' +
      '<i>4</i>' +
      '<i>5</i>' +
      '<i>6</i>' +
      '<i>7</i>' +
      '<i>8</i>' +
      '<i>9</i>' +
      '<i>.</i>' +
      '</span>'
}
ScrollNumber.prototype.run = function (value, digit) {
//  console.log("old = " + this.currentValue + "\nnew = " + value);
  this.currentValue = value
  var self = this
  var valueString = value.toString()
  if (digit && valueString.length < (digit + 1)) {
    var str = '00000000000000'
    valueString = str.substring(0, digit - valueString.length) + valueString
  }
  if (self.autoSizeContainerWidth) {
    self.container.css({
      'width': valueString.length * self.subWidth + 'px'
    })
  }
  let oldLength = self.container.children('.g-num-item').length

  if (valueString.length > oldLength) {
    for (let i = 0; i < valueString.length - oldLength; i++) {
      self.container.append(self.col)
      self.container.children('.g-num-item').eq(oldLength + i).css({
        right: self.subWidth * (oldLength + i) + 'px'
      })
    }
  } else if (valueString.length < oldLength) {
    for (let i = 0; i < oldLength - valueString.length; i++) {
      self.container.children('.g-num-item:last').remove()
    }
  }
  $('.g-num-item').css({
    position: 'absolute',
    width: self.subWidth + 'px',
    height: 11 * self.subHeight + 'px'
  })
  $('.g-num-item i').css({
    width: self.subWidth + 'px',
    height: self.subHeight + 'px',
    lineHeight: self.subHeight + 'px',
    textAlign: 'center',
    fontSize: self.option.fontSize + 'px',
    color: self.option.color,
    display: 'block',
    fontStyle: 'normal',
    background: self.background
  })
  setTimeout(function () {
    if (valueString.length !== self.container.children('.g-num-item').length) {
    }
    for (var i = 0; i < valueString.length; i++) {
      var y = 0
      if (valueString[i] !== '.') {
        y = -(parseInt(valueString[i]) * self.subHeight)
      } else {
        y = -(10 * self.subHeight)
      }
      self.container.children('.g-num-item').eq(valueString.length - i - 1).css({
        top: y + 'px',
        transition: 'top 1.0s'
      })
    }
  }, 0)
}
ScrollNumber.prototype.getCurrentValue = function () {
  return this.currentValue
}
