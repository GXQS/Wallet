# GXQS OMEGA: UX Specifications by Module

**Version**: 1.0  
**Status**: Implementation Ready  
**Target**: All Platforms (Web, Mobile, Desktop, Extension)

---

## 1. WALLET MODULE UX

### 1.1 Onboarding Flow

```
START
│
├─> New User?
│   ├─ YES → Show Onboarding
│   │   ├─ Screen 1: "Secure Your Digital Assets"
│   │   │   ├─ Beautiful gradient bg (quantum blue to purple)
│   │   │   ├─ Feature highlights with icons
│   │   │   └─ CTA: "Get Started" or "Already have wallet? Import"
│   │   │
│   │   ├─ Screen 2: "Choose Your Path"
│   │   │   ├─ Card 1: "Create New Wallet"
│   │   │   │   └─ "Start fresh with seed phrase"
│   │   │   ├─ Card 2: "Seedless Wallet"
│   │   │   │   └─ "Sign in with biometric/passkey"
│   │   │   ├─ Card 3: "Import Existing"
│   │   │   │   └─ "Restore from seed or private key"
│   │   │   └─ Card 4: "Connect Hardware Wallet"
│   │   │       └─ "Ledger, Trezor, or similar"
│   │   │
│   │   ├─ Screen 3 (if New Wallet):
│   │   │   ├─ "Generate Seed Phrase"
│   │   │   ├─ Display 12/24 words with copy button
│   │   │   ├─ Warning: "Never share this phrase"
│   │   │   ├─ CTA: "I've saved it securely"
│   │   │   └─ Behind warning interstitial
│   │   │
│   │   ├─ Screen 4 (Verify Seed):
│   │   │   ├─ Select 3 random words from phrase
│   │   │   ├─ "Tap word [5], then word [12], then word [9]"
│   │   │   ├─ Show word buttons shuffled
│   │   │   └─ CTA: "Continue" (enabled when correct)
│   │   │
│   │   ├─ Screen 5 (Security):
│   │   │   ├─ "Secure Your Wallet"
│   │   │   ├─ Option: Enable Biometric (thumbprint icon)
│   │   │   ├─ Option: Enable Passkey
│   │   │   ├─ Option: Set PIN (fallback)
│   │   │   └─ CTA: "Next"
│   │   │
│   │   └─ Screen 6 (Welcome):
│   │       ├─ "Welcome to GXQS!"
│   │       ├─ Show wallet address (truncated, copyable)
│   │       ├─ QR code for easy sharing
│   │       ├─ Checklist:
│   │       │   ✓ Wallet Created
│   │       │   ✓ Seed Secured
│   │       │   ✓ Biometric Enabled
│   │       │   □ Receive First Funds
│   │       │   □ Send First Transaction
│   │       └─ CTA: "Enter Wallet"
│   │
│   └─ NO → Show Login
│       ├─ "Welcome Back!"
│       ├─ Biometric Login (if enabled)
│       │   └─ "Tap fingerprint to unlock"
│       ├─ Or PIN/Passkey
│       └─ "New device? Import wallet"
```

**Key UX Principles**:

- Non-custodial only (you own keys)
- Clear security warnings without fear-mongering
- Progress indicator visible (5 of 6 steps)
- Ability to skip optional steps
- Recover to previous steps easily

### 1.2 Dashboard (Main Screen)

**Mobile Layout** (Vertical):

```
┌─────────────────────────────┐
│ ← Header (w/ Settings icon) │
│ GXQS Wallet                 │
└─────────────────────────────┘
│                             │
│ ╔═════════════════════════╗ │
│ ║  Total Balance          ║ │
│ ║  $1,234.56              ║ │ (Large, clear)
│ ║  ↑ +5.2% (24h)          ║ │ (Subtle positive/negative)
│ ║  View in [USD/ETH/BTC]  ║ │ (Currency toggle)
│ ╚═════════════════════════╝ │
│                             │
│ ┌───────────────────────┐   │
│ │ Send  │ Receive  │ Swap│   │ (3 quick actions)
│ └───────────────────────┘   │
│                             │
│ ┌────────────────────────┐  │
│ │ Assets                │  │
│ ├────────────────────────┤  │
│ │ ETH    2.5 ETH        │  │
│ │        $4,500 ↑2.1%   │  │
│ │                       │  │
│ │ USDC   1,000 USDC     │  │
│ │        $1,000 ↔0.0%   │  │
│ │                       │  │
│ │ [View all assets →]   │  │
│ └────────────────────────┘  │
│                             │
│ ┌────────────────────────┐  │
│ │ Recent Transactions    │  │
│ ├────────────────────────┤  │
│ │ Sent 0.5 ETH           │  │
│ │ 2 hours ago  ✓ Confirmed
│ │ $900                   │  │
│ │                        │  │
│ │ Swapped 500 USDC       │  │
│ │ Yesterday  ✓ Confirmed │  │
│ │                        │  │
│ │ [View all →]           │  │
│ └────────────────────────┘  │
│                             │
└─────────────────────────────┘
```

**Desktop Layout** (Grid):

```
┌────────────────────────────────────────────┐
│ GXQS Wallet              [Settings]  [Menu] │
├────────────────────────────────────────────┤
│                                            │
│ ┌──────────────────┐  ┌──────────────────┐│
│ │ Total Balance    │  │ Quick Actions    ││
│ │ $1,234.56        │  │ ┌──────────────┐ ││
│ │ ↑ +5.2% (24h)    │  │ │ Send         │ ││
│ │                  │  │ │ [→ Icon]     │ ││
│ │ [History Chart]  │  │ ├──────────────┤ ││
│ │ (24h, 7d, 1m, 1y)  │ │ Receive      │ ││
│ │                  │  │ │ [← Icon]     │ ││
│ │                  │  │ ├──────────────┤ ││
│ │                  │  │ │ Swap         │ ││
│ │                  │  │ │ [↔ Icon]     │ ││
│ │                  │  │ └──────────────┘ ││
│ └──────────────────┘  └──────────────────┘│
│                                            │
│ ┌──────────────────────────────────────┐  │
│ │ Assets (Sortable Table)              │  │
│ ├────┬──────┬────────┬────────┬────────┤  │
│ │ #  │ Asset│ Amount │ Value  │ Change │  │
│ ├────┼──────┼────────┼────────┼────────┤  │
│ │ 1  │ ETH  │ 2.5    │ $4,500 │ ↑ 2.1% │  │
│ │ 2  │ USDC │ 1,000  │ $1,000 │ → 0.0% │  │
│ │ 3  │ DAI  │ 500    │ $500   │ ↑ 0.5% │  │
│ └────┴──────┴────────┴────────┴────────┘  │
│                                            │
│ ┌──────────────────────────────────────┐  │
│ │ Recent Transactions                  │  │
│ ├────────────────────────────────────┤  │
│ │ Sent 0.5 ETH → 0x1234... | 2h ago  │  │
│ │ Swap 500 USDC → 0.25 ETH | 1d ago  │  │
│ │ Receive 1 ETH ← 0x5678.. | 3d ago  │  │
│ └────────────────────────────────────┘  │
│                                            │
└────────────────────────────────────────────┘
```

### 1.3 Send Transaction Flow

```
START: User clicks "Send"
│
├─ Step 1: Enter Recipient
│  ├─ Text input: "Recipient Address"
│  ├─ Placeholder: "0x... or ENS name or domain"
│  ├─ Icons:
│  │  ├─ [Paste icon] - Paste from clipboard
│  │  ├─ [QR icon] - Scan QR code
│  │  ├─ [Recent icon] - Show recent addresses
│  │  └─ [Book icon] - Select from address book
│  ├─ Real-time validation:
│  │  ├─ Valid ✓ (green checkmark)
│  │  ├─ Invalid ✗ (red X, error message)
│  │  └─ Resolving... (ENS/domain lookup)
│  └─ Helper text: "Double-check address"
│
├─ Step 2: Select Asset & Amount
│  ├─ Dropdown: "Select Asset"
│  │  └─ List: ETH (2.5), USDC (1,000), DAI (500)
│  ├─ Text input: "Amount"
│  │  ├─ Placeholder: "0.00"
│  │  ├─ Helper: "Balance: 2.5 ETH"
│  │  └─ Buttons: [25%] [50%] [75%] [MAX]
│  ├─ Show conversion: "≈ $4,500 USD"
│  └─ Warning if high value: "⚠ You're sending >$1000"
│
├─ Step 3: Transaction Details (Auto-calculated)
│  ├─ From: [Your address truncated]
│  ├─ To: [Recipient address truncated]
│  ├─ Amount: 1.0 ETH
│  ├─ Fee Estimation:
│  │  ├─ Network: Ethereum
│  │  ├─ Gas Limit: 21,000 units
│  │  ├─ Gas Price: [Slow/Standard/Fast radio buttons]
│  │  │  ├─ Slow: 25 Gwei → 0.0005 ETH ($1.50)
│  │  │  ├─ Standard: 35 Gwei → 0.0007 ETH ($2.10) ★ SELECTED
│  │  │  └─ Fast: 50 Gwei → 0.001 ETH ($3.00)
│  │  └─ Custom: [Allow advanced users to set]
│  ├─ Total: 1.0007 ETH ≈ $4,502.10
│  └─ Timestamp: Estimated arrival in 3-5 minutes
│
├─ Step 4: Review & Confirm
│  ├─ Show card:
│  │  ┌──────────────────────────┐
│  │  │ Review Transaction       │
│  │  ├──────────────────────────┤
│  │  │ From:  0x1234...         │
│  │  │ To:    0x5678... (ENS)   │
│  │  │ Amount: 1.0 ETH          │
│  │  │ Fee:    0.0007 ETH       │
│  │  │ Total:  1.0007 ETH       │
│  │  │ ────────────────────────│
│  │  │ ≈ $4,502.10 USD         │
│  │  │                          │
│  │  │ Network: Ethereum        │
│  │  │ Nonce: 42 (if advanced)  │
│  │  └──────────────────────────┘
│  ├─ Warnings (if applicable):
│  │  ├─ "⚠ You're sending to a new address"
│  │  ├─ "⚠ Gas fees are unusually high"
│  │  └─ "✓ No malicious contract detected"
│  └─ AI Explanation (optional):
│     "This sends 1 ETH to an external wallet."
│
├─ Step 5: Security Confirmation
│  ├─ If Biometric enabled:
│  │  ├─ Modal: "Confirm with biometric"
│  │  └─ [Fingerprint animation]
│  ├─ If Passkey enabled:
│  │  └─ Browser prompts for passkey
│  └─ If PIN:
│     └─ Modal: Enter 6-digit PIN
│
├─ Step 6: Signing & Broadcasting
│  ├─ Show:
│  │  ├─ "Signing transaction..." [spinner]
│  │  ├─ Progress: "1/4 - Transaction signed"
│  │  ├─ Progress: "2/4 - Broadcasting to network"
│  │  └─ Progress: "3/4 - Confirming..."
│  │
│  └─ [After ~12s] "✓ Transaction confirmed!"
│
├─ Step 7: Success Screen
│  ├─ Show:
│  │  ┌──────────────────────────┐
│  │  │ ✓ Sent Successfully!     │
│  │  │                          │
│  │  │ Amount: 1.0 ETH          │
│  │  │ To: 0x5678... (ENS)      │
│  │  │ Hash: 0xabcd...abcd      │
│  │  │ [Copy] [View Explorer]   │
│  │  │                          │
│  │  │ [Share] [Done]           │
│  │  └──────────────────────────┘
│  │
│  └─ Auto-dismiss after 5s or user clicks "Done"
│
└─ END: Return to Dashboard
```

### 1.4 Receive Address Display

```
When user clicks "Receive":
│
├─ Modal opens:
│  ├─ Title: "Receive Funds"
│  ├─ Large QR Code (centered)
│  │  └─ Scannable address
│  ├─ Address: 0x1234...abcd
│  │  ├─ Full address (clickable for details)
│  │  ├─ [Copy icon] Copy to clipboard
│  │  └─ [Share icon] Share via link
│  ├─ Share Methods:
│  │  ├─ Copy to clipboard
│  │  ├─ Share link (generates short URL)
│  │  ├─ Email
│  │  ├─ Social media
│  │  └─ Messaging apps
│  ├─ Request Payment (optional):
│  │  ├─ Amount input
│  │  ├─ Currency selector
│  │  └─ Generate payment link
│  └─ [Close]
```

### 1.5 Transaction History

```
Desktop Table:
┌─────────────────────────────────────────────────────┐
│ Filters: [All] [Sent] [Received] [Swapped]         │
│ Sort: Date (↓) | Status                            │
├──────┬────────────┬──────────┬─────────┬───────────┤
│ Type │ Address    │ Amount   │ Date    │ Status    │
├──────┼────────────┼──────────┼─────────┼───────────┤
│ ➜    │ 0x5678..   │ 1.0 ETH  │ 2h ago  │ ✓ Confirm │
│ ←    │ 0x9abc..   │ 10 USDC  │ 1d ago  │ ✓ Confirm │
│ ↔    │ Uniswap V3 │ 500 USDC │ 3d ago  │ ✓ Confirm │
│      │ → 0.25 ETH │          │         │           │
└──────┴────────────┴──────────┴─────────┴───────────┘

Mobile List:
├─ Transaction Item
│  ├─ Icon: → (sent)
│  ├─ Title: "Sent to 0x5678..."
│  ├─ Amount: 1.0 ETH (green)
│  ├─ Date: 2 hours ago
│  ├─ Status badge: ✓ Confirmed
│  └─ Tap for details
│
├─ Transaction Item
│  ├─ Icon: ← (received)
│  ├─ Title: "Received from 0x9abc..."
│  ├─ Amount: +10 USDC (green)
│  ├─ Date: 1 day ago
│  ├─ Status badge: ✓ Confirmed
│  └─ Tap for details
```

### 1.6 Settings Screen

```
Settings Sections:

1. Security
   ├─ Biometric Login [Toggle - ON]
   ├─ Passkey Setup [Set up]
   ├─ PIN Code [Change]
   ├─ Session Timeout [15 minutes ▼]
   └─ Export Recovery Phrase [Show backup]

2. Wallet Management
   ├─ Active Wallet: "Main Wallet" [Switch]
   ├─ Add Wallet [+]
   ├─ Remove Wallet [×]
   ├─ Rename Wallet [Edit]
   ├─ Backup All Wallets [Download]
   └─ Multi-Sig Settings [Configure]

3. Networks
   ├─ Current Network: Ethereum Mainnet ✓
   ├─ Add Network [+]
   ├─ Ethereum Mainnet [✓ Edit] [✗]
   ├─ Polygon Mainnet [✓ Edit] [✗]
   └─ Custom RPC [http://...]

4. Privacy
   ├─ Data Collection [Toggle - OFF]
   ├─ Analytics [Toggle - OFF]
   ├─ Error Reporting [Toggle - ON]
   ├─ Privacy Mode [Toggle - OFF]
   └─ Jurisdiction [US ▼] (affects compliance)

5. Appearance
   ├─ Theme [Dark ▼] (Dark/Light/Auto)
   ├─ Font Size [Normal ▼] (Small/Normal/Large)
   ├─ High Contrast [Toggle - OFF]
   └─ Reduced Motion [Toggle - OFF]

6. Notifications
   ├─ Transaction Alerts [Toggle - ON]
   ├─ Price Alerts [Toggle - ON]
   ├─ Security Alerts [Toggle - ON]
   └─ Marketing [Toggle - OFF]

7. About
   ├─ App Version: 1.0.0
   ├─ Build: #12345
   ├─ Check for Updates [Check]
   ├─ Terms of Service [Link]
   ├─ Privacy Policy [Link]
   ├─ Support [Link]
   └─ Report Bug [Link]
```

---

## 2. TOKEN STUDIO UX

### 2.1 Token Creation Wizard

```
Screen 1: Choose Template
├─ Title: "Create Your Token"
├─ Templates (cards, clickable):
│  ├─ "Standard ERC-20"
│  │  └─ Subtitle: "Basic token contract"
│  ├─ "Token with Governance"
│  │  └─ Subtitle: "DAO-ready with voting"
│  ├─ "Staking Token"
│  │  └─ Subtitle: "Built-in staking rewards"
│  ├─ "NFT Collection"
│  │  └─ Subtitle: "ERC-721 or ERC-1155"
│  ├─ "Meme Token"
│  │  └─ Subtitle: "Community-driven token"
│  └─ "Custom"
│     └─ Subtitle: "Build from scratch"
└─ [Back] [Next →]

Screen 2: Basic Info
├─ Token Name: [________]
│  └─ Helper: "e.g., 'My Cool Token'"
├─ Ticker Symbol: [___] (max 6 chars)
│  └─ Helper: "e.g., 'MCT'"
├─ Decimals: [18 ▼] (1-18)
│  └─ Helper: "18 is standard"
├─ Total Supply: [1,000,000 ________]
│  └─ Helper: "Cannot be changed later (except if burnable)"
├─ Burnable: [Toggle - ON]
│  └─ Helper: "Allow token holders to burn tokens"
├─ Pausable: [Toggle - ON]
│  └─ Helper: "Admin can pause transfers (emergency)"
└─ Capped Supply: [Toggle - OFF]
   └─ Helper: "Cannot mint more than cap"

Screen 3: Branding
├─ Logo Upload or AI Generate:
│  ├─ [Upload Logo] [or] [AI Generate]
│  ├─ If Upload:
│  │  └─ Drag & drop PNG/SVG (512x512px)
│  └─ If AI Generate:
│     ├─ Prompt: "Generate logo for a gaming token, neon blue, futuristic"
│     ├─ Show 4 options (generated by AI)
│     └─ User selects one or regenerate
├─ Brand Colors:
│  ├─ Primary: [Color picker] #00D9FF
│  └─ Secondary: [Color picker] #7C3AED
├─ Description: [________] (300 chars)
│  └─ "What is your token used for?"
└─ Website URL: [https://________]
   └─ "Leave blank if none"

Screen 4: Tokenomics
├─ Total Supply: 1,000,000 MCT (readonly, from screen 2)
├─ Distribution:
│  ├─ Treasury: 30%         (300,000 MCT)
│  ├─ Community Rewards: 40% (400,000 MCT)
│  ├─ Team Allocation: 20%  (200,000 MCT)
│  └─ Liquidity: 10%        (100,000 MCT)
│     └─ [Drag to adjust] [or] [Manual percentages]
├─ Vesting:
│  ├─ Treasury Vesting: [None ▼] (Immediate/Linear/Milestone)
│  ├─ Team Vesting:
│  │  ├─ Start: [6 months from launch]
│  │  ├─ Duration: [12 months]
│  │  └─ Cliff: [3 months]
│  └─ Liquidity Lock:
│     ├─ Duration: [24 months]
│     └─ [Lock on deployment]
├─ Initial Price: [0.01 USD]
│  └─ (for charting purposes)
└─ [AI Optimize] - Let AI suggest better tokenomics

Screen 5: Taxes & Fees (Optional)
├─ Transfer Tax: [0 ▼] (0-25%)
│  └─ "Tax applied to all transfers"
├─ Fee Distribution:
│  ├─ To Treasury: [50%]
│  ├─ To Liquidity: [50%]
│  └─ To Stakers: [0%]
├─ Staking Rewards: [15 ▼]% APY
├─ Auto-Liquidity: [Toggle - OFF]
│  └─ "Auto-add liquidity pair"
└─ Anti-Whale:
   ├─ Max Transfer: [1% of supply]
   ├─ Max Wallet: [5% of supply]
   └─ [Toggle both - OFF]

Screen 6: Governance (If Governance Template)
├─ Voting Power: [1 token = 1 vote]
├─ Voting Delay: [1 block]
├─ Voting Period: [7 days]
├─ Proposal Threshold: [100 MCT]
├─ Quorum: [10%]
└─ Timelock Delay: [2 days]

Screen 7: Smart Contract Preview
├─ Generated Solidity code (read-only):
│  ├─ // SPDX-License-Identifier: MIT
│  ├─ pragma solidity ^0.8.0;
│  ├─ contract MCT is ERC20, Ownable {
│  ├─   ...
│  └─ }
├─ [Syntax Highlighting]
├─ [Copy Code]
├─ [Share]
└─ AI Insights:
   ├─ "✓ Contract is safe"
   ├─ "⚠ Consider adding SafeTransfer wrapper"
   └─ "💡 You could save 15% gas by..."

Screen 8: Audit & Security
├─ AI Security Score: 87/100 ✓ GOOD
├─ Issues Found: 1
│  ├─ Missing SafeTransfer (Medium)
│  ├─ [Fix] [Ignore]
├─ Checks Performed:
│  ├─ ✓ Reentrancy protection
│  ├─ ✓ Integer overflow protection
│  ├─ ✓ Access control validated
│  ├─ ⚠ No rate limiting
│  └─ □ Formal verification (premium feature)
├─ Known Risks:
│  ├─ Owner can pause transfers
│  ├─ Owner can burn tokens
│  └─ Owner is centralized (consider DAO governance)
└─ [AI Recommend Fixes]

Screen 9: Deployment
├─ Select Blockchain:
│  ├─ Ethereum [○] (Most secure, higher fees)
│  ├─ Polygon [○] (Cheap, fast)
│  ├─ Arbitrum [●] (Selected - balanced)
│  ├─ Optimism [○]
│  ├─ Solana [○] (If SPL token)
│  └─ Custom RPC [○]
├─ Gas Estimation:
│  ├─ Estimated Gas: 1,500,000 units
│  ├─ Gas Price: 45 Gwei
│  ├─ Total Cost: ~0.0675 ETH (~$400)
│  └─ Fee Options: [Economy] [Standard ✓] [Fast] [Custom]
├─ Final Review:
│  ├─ Name: My Cool Token
│  ├─ Symbol: MCT
│  ├─ Supply: 1,000,000
│  └─ ✓ All settings confirmed
├─ [Sign with Wallet]
└─ → Deploys token...

Screen 10: Success
├─ ✓ Token Deployed Successfully!
├─ Token Address: 0xabcd...1234
│  ├─ [Copy]
│  ├─ [View on Explorer]
│  └─ [Share]
├─ Next Steps:
│  ├─ [Create Liquidity Pair]
│  ├─ [Set Up Staking]
│  ├─ [Submit to CoinGecko]
│  ├─ [Add to Token Lists]
│  └─ [Create Airdrop]
├─ Token Artifacts:
│  ├─ [Download ABI]
│  ├─ [Download Bytecode]
│  ├─ [Generate API Docs]
│  └─ [Setup On Explorers]
└─ [Done] → Dashboard
```

---

## 3. DEX / SWAP UX

### 3.1 Swap Interface

```
Desktop Layout:
┌─────────────────────────────────┐
│ Swap                [Settings]  │
├─────────────────────────────────┤
│                                 │
│ You Pay                         │
│ ┌───────────────────────────┐   │
│ │ Amount: 1.0 _______ ETH ▼│   │
│ │ Balance: 2.5 ETH [MAX]    │   │
│ └───────────────────────────┘   │
│                                 │
│ You Receive                     │
│ ┌───────────────────────────┐   │
│ │ Amount: 25.0 ______ USDC ▼│   │
│ │ Balance: 1,000 USDC       │   │
│ └───────────────────────────┘   │
│                                 │
│ Price: 1 ETH = 25 USDC          │
│ Slippage: 0.5% [Adjust]         │
│ Route: Uniswap V3               │
│ Network Fee: 0.0007 ETH (~$2)   │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [SWAP] (Enabled/Disabled)   │ │
│ └─────────────────────────────┘ │
│                                 │
│ Advanced:                       │
│ ├─ MEV Protection [Toggle ✓]    │
│ ├─ Slippage: 0.5% [Manual]      │
│ ├─ Nonce: [Advanced only]       │
│ └─ Custom Router [Advanced only]│
│                                 │
│ Recent Swaps:                   │
│ ├─ 0.5 ETH → 12.5 USDC (2h ago)│
│ └─ 1.0 DAI → 0.02 ETH (3d ago) │
└─────────────────────────────────┘

Mobile Layout:
┌──────────────────────────┐
│ Swap        [Settings]   │
├──────────────────────────┤
│                          │
│ You Pay                  │
│ ┌──────────────────────┐ │
│ │ 1.0 ETH              │ │
│ │ Balance: 2.5 [MAX]   │ │
│ └──────────────────────┘ │
│                          │
│   [↕ Flip] (swap to-from)
│                          │
│ You Get                  │
│ ┌──────────────────────┐ │
│ │ 25.0 USDC            │ │
│ │ Balance: 1,000       │ │
│ └──────────────────────┘ │
│                          │
│ Price: 1 ETH = 25 USDC  │
│ Fee: $2  Slippage: 0.5% │
│                          │
│ [SWAP]                   │
│                          │
│ < Advanced >             │
└──────────────────────────┘
```

### 3.2 Swap Confirmation

```
Modal: Confirm Swap

┌─────────────────────────┐
│ Confirm Swap            │
├─────────────────────────┤
│                         │
│ You Pay:                │
│ 1.0 ETH ($4,500)        │
│                         │
│ You Receive:            │
│ 25.0 USDC (~$25)        │
│                         │
│ Price Impact: 0.12%     │
│ Network Fee: $2.00      │
│ Total Cost: $2.00       │
│                         │
│ [Cancel]   [Confirm]    │
│                         │
└─────────────────────────┘

During swap:
├─ "Signing transaction..."
├─ "Broadcasting to network..."
├─ "Confirming... (block 18012345)"
└─ ✓ "Swap confirmed!"
```

---

## 4. MINING DASHBOARD UX

### 4.1 Mining Setup

```
START: User clicks "Start Mining"
│
├─ System Check:
│  ├─ Checking device compatibility...
│  ├─ ✓ CPU: Intel i7-11700K (8 cores)
│  ├─ ? GPU: NVIDIA RTX 3060 (detected - add to mining?)
│  ├─ ✓ RAM: 16 GB
│  ├─ ✓ Storage: 500 GB free
│  ├─ ✓ Network: 500 Mbps
│  └─ ✓ Temperature: 32°C (normal)
│
├─ Configuration Screen:
│  ├─ Device Name: [My Gaming PC ▼]
│  ├─ Mining Type: [CPU ◉] [GPU ○]
│  ├─ CPU Intensity:
│  │  ├─ [Eco ○] - 25% usage, minimal noise
│  │  ├─ [Balanced ◉] - 50% usage, moderate
│  │  └─ [Performance ○] - 75% usage, hot
│  ├─ Auto-Thermal: [Toggle - ON]
│  │  └─ "Automatically lower intensity if >85°C"
│  ├─ Idle-Only Mode: [Toggle - ON]
│  │  └─ "Mine only when device is idle"
│  ├─ Time Restrictions:
│  │  ├─ Allow 24/7: ◉
│  │  ├─ Time Limit: ○
│  │  │  └─ From: [22:00] To: [08:00]
│  │  └─ Blackout Days: □ Weekends ○ Weekdays
│  ├─ Power Limit: [Unlimited ▼] (Off/500W/750W/Unlimited)
│  ├─ Battery Protection: [Toggle - ON]
│  │  └─ "Pause mining at 20% battery"
│  ├─ Network Limit: [100 Mbps ▼]
│  └─ [Start Mining] [Test First]
│
└─ Mining Dashboard (once started)
   ├─ Device Status: 🟢 Mining
   ├─ Hash Rate: 2.5 MH/s
   ├─ Power Draw: 150W (eco) / 300W (balanced) / 450W (perf)
   ├─ Temperature: 45°C / 60°C (max)
   ├─ Fan Speed: 30% / 80%
   ├─ Uptime: 4h 23m
   ├─ Shares Found: 42
   │  ├─ Accepted: 40 (95%)
   │  ├─ Stale: 2 (5%)
   │  └─ Invalid: 0 (0%)
   ├─ Estimated Earnings:
   │  ├─ This session: 0.0032 GXQS (~$0.16)
   │  ├─ Today: 0.0064 GXQS (~$0.32)
   │  ├─ This month: 0.19 GXQS (~$9.50)
   │  └─ Next payout: in 2h 30m
   ├─ Device Health: 92% ✓ Excellent
   └─ [Stop Mining] [Settings] [View History]
```

### 4.2 Mining Dashboard

```
Mobile Layout:
┌──────────────────────────────┐
│ Mining Dashboard   [Settings] │
├──────────────────────────────┤
│                              │
│ Status: 🟢 Mining            │
│ Uptime: 4h 23m               │
│                              │
│ ┌────────────────────────┐   │
│ │ Hash Rate              │   │
│ │ 2.5 MH/s               │   │
│ │ ↑ +0.2 (rolling avg)   │   │
│ └────────────────────────┘   │
│                              │
│ ┌────────────────────────┐   │
│ │ Earnings (est.)        │   │
│ │ 0.0064 GXQS (~$0.32)  │   │
│ │ Today                  │   │
│ └────────────────────────┘   │
│                              │
│ Device Health                │
│ ├─ Temperature: 45°C [▓░░░░]│
│ ├─ Power: 150W [░░░░░░░░░░]│
│ ├─ CPU Load: 50% [▓▓░░░░░░░░]
│ ├─ Fan Speed: 30% [░░░░░░░░░░]
│ └─ Overall: 92% ✓ Great     │
│                              │
│ Shares                       │
│ ├─ Found: 42                 │
│ ├─ Accepted: 40 (95%)        │
│ └─ Rejected: 2 (5%)          │
│                              │
│ [Pause] [Settings] [History] │
└──────────────────────────────┘

Desktop Dashboard:
┌────────────────────────────────────┐
│ Mining Operations                  │
├────────────────────────────────────┤
│                                    │
│ Active Devices: 2                  │
│                                    │
│ ┌─────────────────────────────┐   │
│ │ Device: My Gaming PC        │   │
│ ├─────────────────────────────┤   │
│ │ Status: 🟢 Mining          │   │
│ │ Hash Rate: 2.5 MH/s         │   │
│ │ Power: 150W (45°C)          │   │
│ │ Efficiency: 16.7 MH/W       │   │
│ │ Earnings: 0.0064 GXQS/day  │   │
│ │ Uptime: 4h 23m              │   │
│ │ [View Details] [Pause]      │   │
│ └─────────────────────────────┘   │
│                                    │
│ ┌─────────────────────────────┐   │
│ │ Device: Old Laptop          │   │
│ ├─────────────────────────────┤   │
│ │ Status: ⏸ Paused           │   │
│ │ Hash Rate: 0.8 MH/s (idle)  │   │
│ │ Power: 0W                   │   │
│ │ Efficiency: N/A             │   │
│ │ Earnings: 0.0024 GXQS/day   │   │
│ │ Uptime: 128h 45m            │   │
│ │ [View Details] [Resume]     │   │
│ └─────────────────────────────┘   │
│                                    │
│ Total Performance:                 │
│ ├─ Combined Hash: 3.3 MH/s         │
│ ├─ Total Power: 150W               │
│ ├─ Efficiency: 22 MH/W (excellent) │
│ ├─ Daily Earnings: 0.0088 GXQS    │
│ ├─ Monthly Projection: 0.26 GXQS   │
│ ├─ Next Payout: in 1h 45m          │
│ └─ Cumulative Earnings: 2.1 GXQS   │
│    ├─ Available: 1.8 GXQS          │
│    ├─ Next Scheduled: 0.3 GXQS     │
│    └─ Withdrawn: 4.2 GXQS          │
│                                    │
└────────────────────────────────────┘
```

---

## 5. EXPLORER UX

### 5.1 Explorer Homepage

```
┌────────────────────────────────────────┐
│ GXQS Explorer                          │
├────────────────────────────────────────┤
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ Search Address or Transaction    │  │
│ │ [0x... or 0x... or block #...]   │  │
│ │ [🔍 Search]                      │  │
│ └──────────────────────────────────┘  │
│                                        │
│ Network Stats                          │
│ ├─ Latest Block: #18,456,789          │
│ ├─ Block Time: 12.1s (avg)            │
│ ├─ Gas Price: 35 Gwei                 │
│ ├─ Network TPS: 12.5 (current)        │
│ ├─ Active Validators: 432              │
│ └─ Total TVL: $2.1B                    │
│                                        │
│ Latest Blocks                          │
│ ├─ Block 18,456,789: 247 txns | 45s   │
│ ├─ Block 18,456,788: 312 txns | 12s   │
│ ├─ Block 18,456,787: 198 txns | 13s   │
│ └─ [View All Blocks]                   │
│                                        │
│ Latest Transactions                    │
│ ├─ 0xabcd...1234 → 0x5678...9012 | $50│
│ ├─ 0x9012...3456 → 0xabcd...1234 | $75│
│ ├─ Contract Deploy: 0xnew...code | $  │
│ └─ [View All Transactions]             │
│                                        │
│ Top Tokens (24h)                       │
│ ├─ 1. ETH: +5.2% ($4,500) Vol $2.1B    │
│ ├─ 2. USDC: → 0.0% ($1.00) Vol $800M   │
│ └─ [More]                              │
│                                        │
│ Top Validators                         │
│ ├─ 1. Validator-42: 1,200 GXQS         │
│ ├─ 2. NodeRunner-1: 950 GXQS           │
│ └─ [More]                              │
│                                        │
└────────────────────────────────────────┘
```

### 5.2 Transaction Details

```
┌──────────────────────────────────────────┐
│ Transaction: 0xabcd...1234               │
├──────────────────────────────────────────┤
│                                          │
│ Status: ✓ Confirmed (block 18,456,789)  │
│ Hash: 0xabcd...1234 [Copy]               │
│                                          │
│ From:     0x1111...2222 [Copy] [View]    │
│ To:       0x3333...4444 [Copy] [View]    │
│ Contract: 0x5555...6666 [Copy] [View]    │
│                                          │
│ Value: 1.0 ETH ($4,500)                  │
│ Gas Used: 21,000 units / 21,000 limit    │
│ Gas Price: 35.2 Gwei                     │
│ Fee: 0.000735 ETH ($3.31)                │
│                                          │
│ Block: 18,456,789 [View Block]           │
│ Confirmations: 12,543 ✓ Final            │
│ Timestamp: 2 hours ago                   │
│ Nonce: 42                                │
│                                          │
│ Input Data:                              │
│ Function: transfer(...)                  │
│ to: 0x3333...4444                        │
│ amount: 1000000000000000000               │
│                                          │
│ ┌───────────────────────────────────┐   │
│ │ Decoded Input                     │   │
│ ├───────────────────────────────────┤   │
│ │ Function: transfer                │   │
│ │ Recipient: 0x3333...4444          │   │
│ │ Amount: 1.0 ETH                   │   │
│ └───────────────────────────────────┘   │
│                                          │
│ [View more details] [Export JSON]        │
└──────────────────────────────────────────┘
```

---

_GXQS OMEGA UX Specifications v1.0_  
_Status: Ready for Implementation_  
_Next: AI Integration specs, Security architecture, Technical specs_
