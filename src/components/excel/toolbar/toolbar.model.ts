import { StyleObject } from '../../../core/scriptTypes'

export interface ToolbarItem {
  active: boolean
  styles: StyleObject
  group?: boolean
}

export interface ToolbarModel {
  [key: string]: ToolbarItem
}

export function getModel(styles: StyleObject): ToolbarModel {
  return {
    'format_align_left': {
      active: false,
      styles: {
        justifyContent: ''
      },
      group: true
    },
    'format_align_center': {
      active: false,
      styles: {
        justifyContent: 'center'
      },
      group: true
    },
    'format_align_right': {
      active: false,
      styles: {
        justifyContent: 'flex-end'
      },
      group: true
    },
    'format_bold': {
      active: false,
      styles: {
        fontWeight: 'bold'
      }
    },
    'format_italic': {
      active: false,
      styles: {
        fontStyle: 'italic'
      }
    },
    'format_underlined':{
      active: false,
      styles: {
        textDecoration: 'underline'
      }
    }
  }
}

