import type { ElementType, ReactNode, CSSProperties, RefObject } from 'react'

export type BasePlacesType = 'top' | 'right' | 'bottom' | 'left'

export type ExtendedPlacesType =
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'

export type PlacesType = BasePlacesType | ExtendedPlacesType

export type VariantType = 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info'

export type WrapperType = ElementType | 'div' | 'span'

export type ChildrenType = Element | ElementType | ReactNode

export type EventsType = 'hover' | 'click'

export type PositionStrategy = 'absolute' | 'fixed'

export type DataAttribute =
  | 'place'
  | 'content'
  | 'html'
  | 'variant'
  | 'offset'
  | 'crossOffset'
  | 'wrapper'
  | 'events'
  | 'position-strategy'
  | 'delay-show'
  | 'delay-hide'
  | 'float'
  | 'hidden'

/**
 * @description floating-ui middleware
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Middleware = any

export interface IPosition {
  x: number
  y: number
}

export interface ITooltip {
  className?: string
  classNameArrow?: string
  content?: ChildrenType
  contentWrapperRef?: RefObject<HTMLDivElement>
  place?: PlacesType
  offset?: number
  crossOffset?: number
  id?: string
  variant?: VariantType
  /**
   * @deprecated Use the `data-tooltip-id` attribute, or the `anchorSelect` prop instead.
   * See https://react-tooltip.com/docs/getting-started
   */
  anchorId?: string
  anchorSelect?: string
  wrapper: WrapperType
  /**
   * @deprecated Use `openOnClick` instead.
   */
  events?: EventsType[]
  openOnClick?: boolean
  positionStrategy?: PositionStrategy
  middlewares?: Middleware[]
  delayShow?: number
  delayHide?: number
  float?: boolean
  hidden?: boolean
  noArrow?: boolean
  clickable?: boolean
  closeOnEsc?: boolean
  style?: CSSProperties
  position?: IPosition
  isOpen?: boolean
  setIsOpen?: (value: boolean) => void
  afterShow?: () => void
  afterHide?: () => void
  activeAnchor: HTMLElement | null
  setActiveAnchor: (anchor: HTMLElement | null) => void
}
