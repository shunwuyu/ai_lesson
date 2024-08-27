/**
 * 默认异常处理器
 */
export const defaultErrorHandler = (
    error: any,
    ctx
  ) => {
    if (error.message) {
      console.log('🚧', error.message);
    }
  
    let statusCode: number, message: string;
  
    /**
     * 处理异常
     */
    switch (error.message) {
      default:
        statusCode = 500;
        message = '服务暂时出了点问题 ~~ 🌴';
        break;
    }

    ctx.status = statusCode;
    ctx.body = { message };
};
  