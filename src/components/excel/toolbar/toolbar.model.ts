
export interface ToolbarItem {
  icon: string
  active: boolean
  styles: {
    [key: string]: string | number
  }
  group?: boolean
}

export function getModel(): ToolbarItem[] {
  return [
    {
      icon: 'format_align_left',
      active: false,
      styles: {
        justifyContent: 'flex-start'
      },
      group: true
    },
    {
      icon: 'format_align_center',
      active: false,
      styles: {
        justifyContent: 'center'
      },
      group: true
    },
    {
      icon: 'format_align_right',
      active: false,
      styles: {
        justifyContent: 'flex-end'
      },
      group: true
    },
    {
      icon: 'format_bold',
      active: false,
      styles: {
        fontWeight: 'bold'
      }
    },
    {
      icon: 'format_italic',
      active: false,
      styles: {
        fontStyle: 'italic'
      }
    },
    {
      icon: 'format_underlined',
      active: false,
      styles: {
        textDecoration: 'underline'
      }
    }
  ]
}

