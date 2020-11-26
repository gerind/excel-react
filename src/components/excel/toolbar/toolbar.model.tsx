
export interface ToolbarItem {
  icon: string
  active: boolean
  styles: {
    [key: string]: string | number
  }
}

export function getModel(): ToolbarItem[] {
  return [
    {
      icon: 'format_align_left',
      active: false,
      styles: {
        justifyContent: 'flex-start'
      }
    },
    {
      icon: 'format_align_center',
      active: false,
      styles: {
        justifyContent: 'center'
      }
    },
    {
      icon: 'format_align_right',
      active: false,
      styles: {
        justifyContent: 'flex-end'
      }
    },
    {
      icon: 'format_bold',
      active: true,
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
      active: true,
      styles: {
        textDecoration: 'underline'
      }
    }
  ]
}

