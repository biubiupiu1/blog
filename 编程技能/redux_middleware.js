/* 
  扩展一个函数 
  在 redux 中的中间件实现，因为需要扩展 dispatch 函数 , 里面实现了一个 middleware 函数用于扩展
*/

/* 
  这个函数是将函数组合 

  let fin = compose(a, b, c)
  等同于
  let fin = x => {
    let temp = c(x)
    a(b(temp))
  }
  等同于
  let fin = x => a(b(c(x)))

*/

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

/* 
  这里就是用到了 compose 组合函数 
  但是这里特别的是 , 每一个组合的函数返回的都是一个函数（也就是扩展后的 dispatch）
  这样就能做到将 dispatch 一步步的扩展 , 最后返回一个最终的 dispatch
*/

function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      );
    };

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}

/* 
  官方示例代码 logger middleware 
  
  函数有三层 , 第一层是用来接收 store 接口的 , 第二次用来返回一个 扩展后的 dispatch
*/

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action);

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    const returnValue = next(action);

    console.log('state after dispatch', getState());

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue;
  };
}
