import { Image } from '@chakra-ui/react'
import { useFCL } from '../../hooks/useFCL'

export default function AppHeaderTwo() {
  const { appConfig, clientConfig } = useFCL()
  const title = appConfig?.title ? `Connect to ${appConfig?.title}`: 'Connect'

  return (
    <div>
      <div>{title}</div>
      <div>
        {appConfig?.icon &&
          <Image 
            src={appConfig.icon} alt="Logo"
            borderRadius={50}
            boxSize='40px'
          />
        }
        {clientConfig?.hostname &&
          <span>
            {clientConfig.hostname}
          </span>
        }
      </div>
    </div>
  )
}