export default function Home() {
  return (
    <div>
      <h1>FCL Discovery</h1>
      <div style={{ marginTop: '10px' }}>
        <div>Please point to one of the following:</div>
        <div>
          <strong>Mainnet:</strong> https://fcl-discovery.onflow.org/api/authn
        </div>
        <div>
          <strong>Testnet:</strong>{' '}
          https://fcl-discovery.onflow.org/api/testnet/authn
        </div>
        <div>
          <strong>Migrationnet:</strong>{' '}
          https://fcl-discovery.onflow.org/api/migrationnet/authn
        </div>
        <div>
          <strong>Previewnet:</strong>{' '}
          https://fcl-discovery.onflow.org/api/previewnet/authn
        </div>
        <div>
          <strong>Local:</strong>{' '}
          https://fcl-discovery.onflow.org/api/local/authn
        </div>
        <div>
          <strong>Emulator:</strong>{' '}
          https://fcl-discovery.onflow.org/api/emulator/authn
        </div>
      </div>
    </div>
  )
}
