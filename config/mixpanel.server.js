// This lib is only for server side
import Mixpanel from 'mixpanel'

let mixpanel

const initMixpanel = () => {
  if (process.env.MIXPANEL_ID) {
    mixpanel = Mixpanel.init(process.env.MIXPANEL_ID)
  }
}

initMixpanel()

export default mixpanel
