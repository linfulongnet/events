### 自定义事件消息系统，订阅-发布模式
##### 该模块仅供学习使用

### Usage
- 只支持es6导入方式
  ```
  import events from 'path/to/events'
  ```

- 订阅事件，once只执行一次
  ```
  events.on('custom-event', (...args) => {
    console.log(args)
  })
  events.on(['custom-event-1', 'custom-event-2'],  (...args) => {
    console.log(args)
  })
  events.once('custom-event', (...args) => {
    console.log(args)
  })
  ```
- 发布事件
  ```
  events.emit('custom-event', arg1, arg2, ...args)
  events.emit(['custom-event-1', 'custom-event-2'])
  ```
- 取消订阅事件，不传事件名称，则取消所有评阅事件
  ```
  events.off('custom-event', function_name)
  events.off('custom-event')
  events.off()
  ```
