export const handleCancel = () => {
  window.parent.postMessage(
    {
      type: 'FCL:VIEW:CLOSE',
    },
    '*'
  )
}
