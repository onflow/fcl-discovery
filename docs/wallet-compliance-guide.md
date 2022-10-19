# Wallet Compliance Guide

This guide contains a set of critera wallets on Flow must meet in order to be accepted and included in Flow's FCL Wallet Discovery.

## Overview

Wallets on Flow must be compatible with the [FCL wallet provider spec](https://github.com/onflow/fcl-js/blob/master/packages/fcl/src/wallet-provider-spec/draft-v4.md) in order to be compatible with applications built on Flow.

At a minimum, wallets on Flow must provide support for FCL's:

- **Authentication** service: https://github.com/onflow/fcl-js/blob/master/packages/fcl/src/wallet-provider-spec/draft-v4.md#authentication-service

- **Authorization** service: https://github.com/onflow/fcl-js/blob/master/packages/fcl/src/wallet-provider-spec/draft-v4.md#authorization-service

- **User Signature** service: https://github.com/onflow/fcl-js/blob/master/packages/fcl/src/wallet-provider-spec/draft-v4.md#user-signature-service

Wallets may additionally choose to support other FCL services (pre-authz, provable authentication etc), but these additional services are not reqiured to be included in Flow's FCL Wallet Descovery.

## Testing

In order to be included in Flow's FCL Wallet Discovery, new wallets must prove their functionality, and continue to prove their functionality on a recurrent basis from time to time. Wallets that fail to prove their functionality may be subject to removal from FCL Discovery until their functionality is restored.

Wallets will be tested against the FCL Harness (TODO: Link) application. The FCL Harness will be configured to use each wallet, and will be used to carry out **Authentication**, **Authorization** of a transaction, and **User Signature** over some data.

Wallet developers are expected to ensure their wallet meets the required functionality by using the FCL Harness to test their wallet. Prior to inclusion in Flow's FCL Discovery, the Flow team will also carry out this testing to ensure functionality. From time to time, the Flow team will carry out testing to ensure continued functionality.
