/*
* 自定义事件消息系统，订阅-发布模式
* */

const EventPool: Map<string, Function[]> = new Map<string, Function[]>()

function getMap(key: string): Function[] {
  return EventPool.get(key) || []
}

function setMap(key: string, value: Function[]): void {
  if (value.length) {
    EventPool.set(key, value)
  } else {
    EventPool.delete(key)
  }
}


export default {
  // 发布事件
  emit(event: string | string[], ...args: any[]): void {
    if (Array.isArray(event)) {
      event.forEach((eventName) => {
        this.emit(eventName, ...args)
      })
      return
    }

    const eventName: string = event as string
    const events: Function[] = getMap(eventName)
    events.forEach((fn) => {
      // @ts-ignore
      fn.apply(this, args)
    })
  },
  // 订阅事件
  on(event: string | string[], fn: Function): void {
    if (Array.isArray(event)) {
      event.forEach((eventName) => {
        this.on(eventName, fn)
      })
      return
    }

    const eventName: string = event as string
    let events: Function[] = getMap(eventName)
    events.push(fn)
    setMap(eventName, events)
  },
  // 订阅事件，只执行一次
  once(event: string, fn: Function): void {
    // 包装事件回调，先解绑事件，再执行回调
    const wrapper = (args: any[]) => {
      this.off(event, wrapper)
      fn.apply(this, args)
    }
    wrapper.fn = fn
    
    this.on(event, wrapper)
  },
  // 解绑事件，没有参数则清空所有订阅事件，fn不存在则解绑事件所有回调
  off(event?: string | string[], fn?: Function): void {
    if (!arguments.length) {
      EventPool.clear()
      return
    }

    if (Array.isArray(event)) {
      event.forEach((eventName) => {
        this.off(eventName, fn)
      })
      return
    }

    const eventName: string = event as string
    if (!fn) {
      setMap(eventName, [])
      return
    }

    let events: Function[] = getMap(eventName)
    events = events.filter((method) => {
      // @ts-ignore
      const _fn: Function | undefined = method.fn
      return !(method === fn || _fn === fn)
    })

    setMap(eventName, events)
  }
}

