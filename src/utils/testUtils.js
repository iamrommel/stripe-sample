import * as td from 'testdouble'

export const any = td.matchers.anything()

export const contains = td.matchers.contains

export const when = (args, ...rest) =>
  args ? td.when(td.func()(args, ...rest), { ignoreExtraArgs: true }) : td.when(td.func()(), { ignoreExtraArgs: true })
