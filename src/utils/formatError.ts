interface JoiError {
    message: string
    path?: string[]
    type?: string
    context?: Record<string, string>
  }
  
  const formatError = (errors: JoiError[]) => {
    errors.map((err) => {
      delete err.path
      delete err.context
      delete err.type
    })
  
    return errors
  }

  export default formatError;