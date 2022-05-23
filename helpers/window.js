export const handleCancel = () => {
  window.parent.postMessage(
    {
      type: 'FCL:FRAME:CLOSE',
    },
    '*'
  )
}
