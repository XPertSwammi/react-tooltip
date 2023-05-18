import type { Middleware } from '../components/Tooltip/TooltipTypes'

export interface IComputePositions {
  elementReference?: Element | HTMLElement | null
  tooltipReference?: Element | HTMLElement | null
  tooltipArrowReference?: Element | HTMLElement | null
  place?:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
  offset?: number
  crossOffset?: number
  strategy?: 'absolute' | 'fixed'
  middlewares?: Middleware[]
}
