export function timer (prefix: string) {
  return function decorator<This, Args extends any[], Return> (
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
  ) {
    const methodName: string = context.name?.toString() ?? '[unnamed method]'
    function wrap (this: This, ...args: Args): Return {
      const now = Date.now()
      const result = target.call(this, ...args)
      console.info(
        `${prefix}${methodName} was processed in ${Date.now() - now}ms`
      )
      return result
    }

    return wrap
  }
}
