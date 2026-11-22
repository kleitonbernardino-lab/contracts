# Soroban Storage & TTL Lifecycle Guide

## Storage Tiers
- **Instance Storage:** Tied to contract executable instance lifecycle.
- **Persistent Storage:** Retained until TTL expiration; restorable via ledger archival state.
- **Temporary Storage:** Ephemeral storage designed for short-lived session states.

## Extending Footprint TTL
Contract functions must invoke `env.storage().instance().extend_ttl(threshold, extend_to)` to guarantee availability across active usage windows.
