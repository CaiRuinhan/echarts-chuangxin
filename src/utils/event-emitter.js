/**
 * Created by jiangx36
 */

class EventEmitter {
  constructor () {
    this._events = Object.create(null)
  }

  // 监听event事件，触发时调用callback函数handler
  on (type, handler) {
    (this._events[type] || (this._events[type] = [])).push(handler)
  }

  // 停止监听event事件
  off (type, handler) {
    if (this._events[type]) {
      this._events[type].splice(this._events[type].indexOf(handler) >>> 0, 1)
    }
  }

  // 为事件注册单次监听器
  once (type, handler) {
    let fired = false

    function magic () {
      this.off(type, magic)

      if (!fired) {
        fired = true

        handler.apply(this, arguments)
      }
    }

    this.on(type, magic)
  }

  // 触发事件，并把参数传给事件的处理函数
  emit (type) {
    let payload = [].slice.call(arguments, 1)
    let array = this._events[type] || []
    for (let i = 0; i < array.length; i++) {
      let handler = this._events[type][i]
      handler.apply(this, payload)
    }
  }
}

export default EventEmitter
