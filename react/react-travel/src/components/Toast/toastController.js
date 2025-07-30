import mitt from 'mitt'

export const toastEvents = mitt()

export function showToast({ user = 0, bell = 0, mail = 0 }) {
  console.log('////')
  toastEvents.emit('show', { user, bell, mail })
}
