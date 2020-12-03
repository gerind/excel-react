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
      active: !styles.justifyContent,
      styles: {
        justifyContent: ''
      },
      group: true
    },
    'format_align_center': {
      active: styles.justifyContent === 'center',
      styles: {
        justifyContent: 'center'
      },
      group: true
    },
    'format_align_right': {
      active: styles.justifyContent === 'flex-end',
      styles: {
        justifyContent: 'flex-end'
      },
      group: true
    },
    'format_bold': {
      active: styles.fontWeight === 'bold',
      styles: {
        fontWeight: 'bold'
      }
    },
    'format_italic': {
      active: styles.fontStyle === 'italic',
      styles: {
        fontStyle: 'italic'
      }
    },
    'format_underlined':{
      active: styles.textDecoration === 'underline',
      styles: {
        textDecoration: 'underline'
      }
    }
  }
}

