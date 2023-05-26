import {
  getCurrentInstance,
  SetupContext,
  createSetupContext
} from './component'
import { EmitFn, EmitsOptions } from './componentEmits'
import { ComponentObjectPropsOptions, ExtractPropTypes } from './componentProps'
import { warn } from './warning'

/**
 * Compile-time-only helper used for declaring props inside `<script setup>`.
 * This is stripped away in the compiled code and should never be actually
 * called at runtime.
 */
// overload 1: string props
export function defineProps<
  TypeProps = undefined,
  PropNames extends string = string,
  InferredProps = { [key in PropNames]?: any }
>(
  props?: PropNames[]
): Readonly<TypeProps extends undefined ? InferredProps : TypeProps>
// overload 2: object props
export function defineProps<
  TypeProps = undefined,
  PP extends ComponentObjectPropsOptions = ComponentObjectPropsOptions,
  InferredProps = ExtractPropTypes<PP>
>(props?: PP): Readonly<TypeProps extends undefined ? InferredProps : TypeProps>
// implementation
export function defineProps() {
  if (__DEV__) {
    warn(
      `defineProps() is a compiler-hint helper that is only usable inside ` +
        `<script setup> of a single file component. Its arguments should be ` +
        `compiled away and passing it at runtime has no effect.`
    )
  }
  return null as any
}

export function defineEmit<
  TypeEmit = undefined,
  E extends EmitsOptions = EmitsOptions,
  EE extends string = string,
  InferredEmit = EmitFn<E>
>(emitOptions?: E | EE[]): TypeEmit extends undefined ? InferredEmit : TypeEmit
// implementation
export function defineEmit() {
  if (__DEV__) {
    warn(
      `defineEmit() is a compiler-hint helper that is only usable inside ` +
        `<script setup> of a single file component. Its arguments should be ` +
        `compiled away and passing it at runtime has no effect.`
    )
  }
  return null as any
}

export function useContext(): SetupContext {
  const i = getCurrentInstance()!
  if (__DEV__ && !i) {
    warn(`useContext() called without active instance.`)
  }
  return i.setupContext || (i.setupContext = createSetupContext(i))
}
