// This lib is only for server side
import mixpanel from 'mixpanel'

export default mixpanel.init(process.env.MIXPANEL_ID)